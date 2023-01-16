const express = require("express")
const jwt = require("jsonwebtoken")
const {connection} = require("./config/db")
const {UserModel} = require("./models/User.model")

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.post("/signup", async (req, res) => {
    const payload = req.body;
    try{
        const user = new UserModel(payload)
        await user.save()
        res.send("Sign up successfull")
    }
   catch(err){
        console.log(err)
        res.send("Something went wrong, pls try again later")
   }
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
      const user = await UserModel.find({email, password})
      if(user.length > 0){
        const token = jwt.sign({"course":"nxm" }, 'hush');
        res.send({"msg":"Login successfull","token" : token})
      } 
      else{
        res.send("Login failed")
      }
    }
    catch{
        res.send("Something went wrong, please try again later")
    }
    res.send("work in progress")
})


app.get("/about", (req, res) => {
    res.send("About us data..")
})

app.get("/weather", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    var decoded = jwt.verify(token, 'hush', (err, decoded) => {
        if(err){
            res.send("please login again")
        }
        else if(decoded){
           res.send("Weather data is ......")
        }
    });
})

app.get("/purchased", (req, res) => {
    var token = req.query.token
    var decoded = jwt.verify(token, 'hush', (err, decoded) => {
        if(err){
            res.send("please login again")
        }
        else if(decoded){
           res.send("purchased data...")
        }
    });
})

app.get("/contact", (req, res) => {
    res.send("Out contact data....")
})

app.listen(8080, async () => {
    try{
        await connection;
        console.log("Connected to DB Successfully")
    }
    catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log("Listening on PORT 8080")
})

//10:18pm