// dependencies
const express = require('express')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const busboy = require('busboy');
const http = require('http');
const path = require('path')
const os = require('os')
const fs = require('fs')
// config express
const app = express()


// config CORS
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// config firebase

const serviceAccount = require('./serviceAccountKey.json');
const { getStorage } = require('firebase-admin/storage');
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'gs://vncsgram.appspot.com'
});

const db = getFirestore();
const bucket = getStorage().bucket();
let fields = {}
let fileData = {}
let UUID = require('uuid-v4');

// endpoint - posts
app.get('/posts', (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*')
  console.log("Backend is running");
  let posts = []
  db.collection('posts').orderBy('date', 'desc').get().then(snapshot => {
    snapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    res.send(posts)
  });

})
// endpoint - createPost
app.post('/createPost', (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*')
  let uuid = UUID()
  const bb = busboy({ headers: req.headers });
  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    let filepath = path.join(os.tmpdir(), filename);
    file.pipe(fs.createWriteStream(filepath))
    fileData = {
      filepath, mimeType
    }
  });

  bb.on('field', (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
    fields[name] = val;
  });

  bb.on('close', () => {
    console.log(fields);
    bucket.upload(
      fileData.filepath,
      {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (err, uploadFiles) => {
        if (!err) {
          createDocument(uploadFiles)
        }
      }
    )
    function createDocument(uploadFiles) {

      db.collection('posts').doc(fields.id).set({
        id: fields.id,
        caption: fields.caption,
        date: parseInt(fields.date),
        location: fields.location,
        photo: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadFiles
          .name}?alt=media&token=${uuid}`
      }).then(() => {
        res.send('Post added: ' + fields.id)
      });
    }
    // res.writeHead(303, { Connection: 'close', Location: '/' });
  });
  req.pipe(bb);
})



// listen
app.listen(process.env.PORT || 3000)
