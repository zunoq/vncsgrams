// dependencies
const express = require('express')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


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

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// endpoint - posts
app.get('/posts', (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*')
  console.log("Backend is running");
  let posts = []
  db.collection('posts').get().then(snapshot => {
    snapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    res.send(posts)
  });

})



// listen
app.listen(process.env.PORT || 3000)
