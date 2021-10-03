const admin  = require ('../../firebase.js');


module.exports = async function getCommunityDetails(communityId){
    var db = admin.database();
    var ref = db.ref("community");
    let data = await (await ref.child(communityId).once("value")).val()

    if(data==null){
        return {status:404,message:"Community with given ID not found"}
    }
    else{
        if(data['subtopics']==undefined){
            data['subtopics'] = []
        }
        if(data['resources']==undefined){
            data['resources'] = []
        }
        if(data['forumQuestions']==undefined){
            data['forumQuestions'] = []
        }
        let forumArrayQuestions = []

        for(let key in data['forumQuestions']){
            // console.log(key)
            forumArrayQuestions.push(data['forumQuestions'][key])
        }
        data['forumQuestions'] = forumArrayQuestions
        return {status :200,...data}
    }

}
