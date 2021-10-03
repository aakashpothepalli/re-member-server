let { getAuth, signInWithEmailAndPassword } =  require("firebase/auth");

async function login(email,password){
  const auth = getAuth();

  return signInWithEmailAndPassword(auth,email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    //  user['providerData'] = undefined
    // console.log(user)
    let data = user.toJSON()
    // console.log(data)
    delete data['stsTokenManager']
    delete data['apiKey']
    delete data['appName']
    delete data['isAnonymous']
    delete data['providerData']
    return  {...data,status:200}
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {errorCode,message:"Invalid email/pass",status:401}
  });

}

module.exports = login