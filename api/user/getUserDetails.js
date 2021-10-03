const admin  = require ('../../firebase.js');


module.exports = async function getUserDetails(uid1){
    var db = admin.database();
    var ref = db.ref();
    let data = await (await ref.once("value")).val()
    // console.log(data)    

    let {points,displayName,uid} = data['users'][uid1]

    let questionsCount = 0;
    let answersCount = 0
    let communities = data['community']

    for(let ComID in communities){
        let community = communities[ComID]
        // console.log(community)
        let questions = community['forumQuestions']
        // console.log(questions)
        if(questions==undefined)questions={}
        for(let i in questions){
            let question = questions[i]
            if(question['ownerUid']==uid){
                questionsCount++;
            }
            let answers = question['answers']
            if(answers==undefined)answers={}
            // console.log(answers)
            for(let j in answers){
                if(answers[j]['ownerUid']==uid){
                    answersCount++;
                }
            }
        }
    }
    let profile = {answersCount,questionsCount,points,displayName,uid};

    return {status:200,...profile}
}
