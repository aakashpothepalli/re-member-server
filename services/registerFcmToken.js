const admin  = require ('../firebase.js');

async function registerFcmToken(fcmToken,uid){
   let db  = admin.database()

   await db.ref("users").child(uid).child("fcmToken").set(fcmToken);
   return {status:200,message:"sucessfully set FCM Token "}
   
}

module.exports = registerFcmToken