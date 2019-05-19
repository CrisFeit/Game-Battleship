const rankList = document.getElementById('rank-list');

var firebaseConfig = {
  apiKey: "AIzaSyAsOckeBlx0P8kg8XRr66XwkIT_T6VHJms",
  authDomain: "battleship-web-2cde3.firebaseapp.com",
  databaseURL: "https://battleship-web-2cde3.firebaseio.com",
  projectId: "battleship-web-2cde3",
  storageBucket: "battleship-web-2cde3.appspot.com",
  messagingSenderId: "22663135008",
  appId: "1:22663135008:web:f6fb7dd2cc5a7aee"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function getPlayers(){
db.collection('rank').get().then(snapshot =>{
  snapshot.docs.forEach(doc => {
    return doc;
  });
});
}


