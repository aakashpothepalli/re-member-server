const admin  = require ('../../firebase.js');


module.exports = async function postNewForumQuestion(uid,displayName,body){
    var db = admin.database();
    var ref = db.ref("community");
    let requiredParams = ['question','communityId']

    for(let param of requiredParams){
        if(body[param]==undefined){
            return {status:400,message:param+" not found in the body of the request"}
        }
    }
    let oldForumQuestions = await (await ref.child(body['communityId']).child("forumQuestions").once('value')).val()
    if(oldForumQuestions==null){
        oldForumQuestions  ={}
    }
    
    const { v4: uuidv4 } = require('uuid');
    let qid = uuidv4();

    let newQuestion ={
        ...body,
        answers:[],
        postedBy:displayName,
        postedAt:new Date(),
        qid,
        ownerUid:uid
    }
    oldForumQuestions[qid] = (newQuestion)
    let user = await( await db.ref("users").child(uid).once("value")).val()
    user['points'] +=50

    // console.log(communityId)
    await Promise.all([
        ref.child(body['communityId']).child('forumQuestions').set(oldForumQuestions),
        db.ref("users").child(uid).set(user)
    ])
    return {status :200,message:"you have been awarded 50 learning points for posting a question 🎉",...newQuestion}
    

}
