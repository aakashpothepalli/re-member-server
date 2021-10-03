let { getAuth, sendPasswordResetEmail } = require("firebase/auth");

module.exports = async function resetpass(email){

    const auth = getAuth();
    return sendPasswordResetEmail(auth, email)
    .then(() => {
        return {status:200,message:"password reset email sent!"}
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {status:401,message:errorMessage,errorCode}
    });
    
}