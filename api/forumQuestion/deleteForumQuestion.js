const admin  = require ('../../firebase.js');


module.exports = async function deleteForumQuestion(uid,body){
    var db = admin.database();
    var ref = db.ref("community");
    let requiredParams = ['communityId','qid']

    for(let param of requiredParams){
        if(body[param]==undefined){
            return {status:400,message:param+" not found in the body of the request"}
        }
    }

    await ref.child(body['communityId']).child("forumQuestions").child(body['qid']).remove()
    
    return {status :200,message:"sucessfully deleted the question"}
    

}
