
let admin = require('firebase-admin');
let serviceAccount = require("./serviceAccountKey.json");
let { initializeApp } =  require("firebase/app");
const firebaseConfig = {
  apiKey: "AIzaSyD12ZXH2ODeGYmd_aUL77BZar3TGVuq0EI",
  authDomain: "re-member-cf4.firebaseapp.com",
  databaseURL: "https://re-member-cf4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "re-member-cf4",
  storageBucket: "re-member-cf4.appspot.com",
  messagingSenderId: "856002392684",
  appId: "1:856002392684:web:571d2c497bb976287e5e49",
  measurementId: "G-7LBXNMZ35M"
};

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://re-member-cf4-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const app = initializeApp(firebaseConfig);

// const registrationToken = 'dAyHGkYbRY-OI6EC6OTIW8:APA91bFgZpdSRlUAPG8_uyaxulx6WKpypL0MjQvPKiw49DDXBWucvou3ogpwt70QAkA6o9G92FuXnoKJl_R1MLS2Wf_Myj6Z8InZl4W82kMVf0XnH7BOKxIe83ax--mYfL5AYLZO9y_C';



// Send a message to the device corresponding to the provided
// registration token.

module.exports =  admin

