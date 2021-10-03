const admin  = require ('../firebase.js');

async function register(email,password,Name){
  return  admin
  .auth()
  .createUser({
    email: email,
    password: password,
    displayName: Name,
    disabled: false,
  })
  .then(async (userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    var db = admin.database();
    var ref = db.ref("users");
    ref.child(userRecord.uid).set({
      uid:userRecord.uid,
      displayName:userRecord.displayName,
      email:userRecord.email,
      points:0
    })

    console.log('Successfully created new user:', userRecord.uid);
    return {"status":200,message:"Successfully created new user",uid:userRecord.uid}
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
    return {"status":400,message:error}

  });
}

// async function getToken(uid) {
//   const axios = require('axios').default;
// const FIREBASE_API_KEY = 'AIzaSyD12ZXH2ODeGYmd_aUL77BZar3TGVuq0EI';

//   try {
//     const customToken = await admin.auth().createCustomToken(uid);

//     const res = await axios({
//       url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${FIREBASE_API_KEY}`,
//       method: 'post',
//       data: {
//         token: customToken,
//         returnSecureToken: true
//       },
//       json: true,
//     });
//     return res.data.idToken;

//     } catch (e) {
//       console.log(e);
//     }
// };


module.exports = register