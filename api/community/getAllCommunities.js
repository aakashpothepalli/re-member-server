const admin  = require ('../../firebase.js');


module.exports = async function getAllCommunities(){
    var db = admin.database();
    var ref = db.ref("community");
    let data = await (await ref.once("value")).val()
    let resp = []

    if(data==null){
        return {status:200,message:[]}
    }
    for(let i in data){
        if(data[i]['subtopics']==undefined){
            data[i]['subtopics'] = []
        }
        if(data[i]['resources']==undefined){
            data[i]['resources'] = []
        }
        if(data[i]['forumQuestions']==undefined){
            data[i]['forumQuestions'] = []
        }
        let forumArrayQuestions = []

        for(let key in data[i]['forumQuestions']){
            // console.log(key)
            forumArrayQuestions.push(data[i]['forumQuestions'][key])
        }
        data[i]['forumQuestions'] = forumArrayQuestions

        resp.push(data[i])
    }
    
    return {status :200,communities:resp}
    

}
