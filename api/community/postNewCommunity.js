const admin  = require ('../../firebase.js');


module.exports = async function postNewCommunity(body){
    var db = admin.database();
    var ref = db.ref("community");
    let requiredParams = ['communityName','communityDescription','participantsCount','subtopics','resources','imageURL']

    for(let param of requiredParams){
        if(body[param]==undefined){
            return {status:400,message:param+" not found in the body of the request"}
        }
    }
    if(!Array.isArray (body['subtopics']) || !Array.isArray(body['resources'])){
        return {status:400,message: "subtopics/resources parameter is not a List"}
    }
    const { v4: uuidv4 } = require('uuid');
    let communityId = uuidv4();
    // console.log(communityId)

    await ref.child(communityId).set({...body,communityId})
    return {status :200,message:"sucessfully created a new Community",communityId}
    

}
