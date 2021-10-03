const express = require("express")
const app = express()
const cors  = require('cors')
app.use(express.json())
app.use(cors())
let checkIfAuthenticated = require('./middlewares/auth.js')

app.get("/",checkIfAuthenticated,async (req,res)=>{
    // const register  = require ('./services/register');
    // let data = await register("p.saiaakash520@gmail.com","hello1234","Aakash");
    console.log(req.uid)

    res.send("hello "+req.displayName+"!")
})
app.get("//register",(req,res)=>{
    res.send("hi")
})
app.post("//register",async(req,res)=>{
    const {email,pass,displayName} = req.body 
    let register = require("./services/register")
    let data = await register(email,pass,displayName);
    res.status(data.status).send(data)
})
app.post("//register/fcm",checkIfAuthenticated, async (req,res)=>{
    const {fcmToken} = req.body
    let registerFcmToken = require("./services/registerFcmToken")
    let data = await registerFcmToken(fcmToken,req.uid)
    res.status(data.status).send(data)
})
app.post("//login",async(req,res)=>{
    const {email,pass}  = req.body
    let login = require("./services/login")
    let data = await login(email,pass)
    res.status(data.status).send(data)
})

app.post("//resetpass",async(req,res)=>{
    const {email} = req.body
    let resetpass = require("./services/resetpass.js");
    let data = await resetpass(email)
    res.status(data.status).send(data)
})


/// community

app.get("//community/all", async (req,res)=>{
    let getAllCommunities = require("./api/community/getAllCommunities")
    let data = await getAllCommunities()
    res.status(data.status).send(data)
})
app.get("//community/:communityId", async (req,res)=>{
    const {communityId} = req.params
    let getCommunityDetails = require("./api/community/getCommunityDetails")
    let data = await getCommunityDetails(communityId)
    res.status(data.status).send(data)
})


app.post("//community", async (req,res)=>{
    
    let postNewCommunity = require("./api/community/postNewCommunity")
    let data = await postNewCommunity(req.body)
    res.status(data.status).send(data)
})

// forum question

app.post("//forumQuestion",checkIfAuthenticated, async (req,res)=>{
    let postNewForumQuestion  = require("./api/forumQuestion/postNewForumQuestion");
    let data = await postNewForumQuestion(req.uid,req.displayName,req.body)
    res.status(data.status).send(data)
})

app.post("//forumQuestion/update",checkIfAuthenticated,async(req,res)=>{
    let updateForumQuestion  = require("./api/forumQuestion/updateForumQuestion");
    let data = await updateForumQuestion(req.uid,req.body)
    res.status(data.status).send(data)
})

app.post("//forumQuestion/delete",checkIfAuthenticated,async(req,res)=>{
    let deleteForumQuestion  = require("./api/forumQuestion/deleteForumQuestion");
    let data = await deleteForumQuestion(req.uid,req.body)
    res.status(data.status).send(data)
})

app.post("//forumQuestion/addAnswer",checkIfAuthenticated,async (req,res)=>{
    let addAnswer = require("./api/forumQuestion/addAnswer")
    let data = await addAnswer(req.uid,req.displayName,req.body)
    res.status(data.status).send(data)

})
// leaderboard

app.get("//leaderboard",async (req,res)=>{
    let getLeaderboard = require("./api/leaderboard/getLeaderboard")
    let data = await getLeaderboard();
    res.status(data.status).send(data)
})


//user 

app.get("//user/:uid",async (req,res)=>{
    let getUserDetails = require("./api/user/getUserDetails")
    let data  = await getUserDetails(req.params.uid);
    res.status(data.status).send(data)
})

app.listen(5454,()=>{
    console.log("app is working yayy")
})

