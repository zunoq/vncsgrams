// dependencies
const express = require('express')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


// config express
const app = express()
app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});
app.get('/', function (req, res, next) {
  // Handle the get for this route
});
app.post('/', function (req, res, next) {
  // Handle the post for this route
})
// config firebase

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// endpoint - posts
app.get('/posts', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  console.log("Backend is running");
  let posts = [
  ]
  db.collection('posts').get().then(snapshot => {
    snapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    res.send(posts)
  });

})



// listen
app.listen(process.env.PORT || 3000)
