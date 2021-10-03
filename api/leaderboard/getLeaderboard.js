const admin  = require ('../../firebase.js');

module.exports = async function getAllCommunities(){
    var db = admin.database();
    var ref = db.ref("users");
    let data = await (await ref.once("value")).val()
    let resp = []

    if(data==null){
        return {status:200,message:[]}
    }

    let leaderboard = []

    for(let i in data){
        leaderboard.push(data[i])
        delete data[i]['email']
    }

    leaderboard.sort((a,b)=>{
        return a['points']<b['points']?0:-1
    })
    // console.log(leaderboard)

    return {status :200,leaderboard}
    

}
