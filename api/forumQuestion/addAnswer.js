const admin  = require ('../../firebase.js');


module.exports = async function addAnswer(uid,displayName,body){
    var db = admin.database();
    var ref = db.ref("community");
    let requiredParams = ['communityId','qid','answer']

    for(let param of requiredParams){
        if(body[param]==undefined){
            return {status:400,message:param+" not found in the body of the request"}
        }
    }
    let selectedQuestion = await (await ref.child(body['communityId']).child("forumQuestions").child(body['qid']).once('value')).val()
    if(selectedQuestion['answers']==undefined){
        selectedQuestion['answers'] = []
    }
    
    const { v4: uuidv4 } = require('uuid');
    let answerId = uuidv4();

    let newAnswer ={
        communityId:body['communityId'],
        postedBy:displayName,
        postedAt:new Date(),
        answerId,
        ownerUid:uid,
        answer:body['answer']
    }
    selectedQuestion['answers'].push(newAnswer)
    let user = await( await db.ref("users").child(uid).once("value")).val()
    user['points'] +=100

    // console.log(communityId)
    let fcmToken =await (await db.ref("users").child(selectedQuestion['ownerUid']).child('fcmToken').once("value")).val()
    const message = {
        notification: {
            title: user['displayName']+" has answered your question!",
            body: newAnswer.answer
        },
        token: fcmToken
        };
    console.log("fcmToken",fcmToken);
    await Promise.all([
        ref.child(body['communityId']).child('forumQuestions').child(body['qid']).set(selectedQuestion),
        db.ref("users").child(uid).set(user),
        sendNotification(message)
    ])
    return {status :200,message:"you have been awarded 100 learning points for answering a question 🎉🎉",...newAnswer}
    

}
async function sendNotification(message){
    if(message.token==undefined || message.token==null)return;
return admin.messaging().send(message)
    .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
    })
    .catch((error) => {
    console.log('Error sending message:', error);
    });

}