const admin  = require ('../../firebase.js');


module.exports = async function updateForumQuestion(uid,body){
    var db = admin.database();
    var ref = db.ref("community");
    let requiredParams = ['question','communityId','qid']

    for(let param of requiredParams){
        if(body[param]==undefined){
            return {status:400,message:param+" not found in the body of the request"}
        }
    }

    await ref.child(body['communityId']).child("forumQuestions").child(body['qid'])
    .child('question').set(body['question'])
    
    
    return {status :200,message:"sucessfully updated the question"}
    

}
