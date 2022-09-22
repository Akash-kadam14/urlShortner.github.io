const express = require("express")
const { dirname } = require("path")
const path = require("path")
const app = express()
const hbs = require("hbs")
const port = process.env.PORT || 5000


//requiring connction.js
require("./db/connection")

//requiring user collection

const User_collection = require("./models/userSchema")
const async = require("hbs/lib/async")
//setting path of static files
const static_Path = path.join(__dirname, "../Public")
//setting path of hbs files
const template_path=path.join(__dirname,"../templates/views")
const partials_path=path.join(__dirname,"../templates/partials")
//middelewares
/*setting bootstrap, js and jquery path */
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")))
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")))
app.use('/jquery',express.static(path.join(__dirname,"../node_modules/jquery/dist")))


//urlencoded:false to get the data from cotact us page 
app.use(express.urlencoded({extended:false}))

//setting view engine
app.set("view engine","hbs")
app.set("views",template_path)
app.set("partials",partials_path)


//registering or telling express to  use partials
hbs.registerPartials(partials_path) 


//use static file in express we use middleware express.static(path) method
// app.use(express.static(static_Path))

//routing
//app.get(path,callback)
app.get("/index", (req, res) => {
    res.render("index")
})


app.post("/contact",async(req,res)=>{
    try {
        // res.send(req.body)
        
        //storing the contact page data in db
        //whenever we want to create new the data in db or add the data in db we use new keyword wgile using post
        const UserData = new  User_collection({
            name:req.body.ContactName,
            email:req.body.ContactEmail,
            phone:req.body.ContactPhone,
            DbMessege:req.body.ContactMessege}) //new means here create new document and save it in db
        //  const UserData = new  User_collection(req.body)
        console.log(UserData);
        await UserData.save()
        res.status(201).render("index")
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

//server create
app.listen(port, () => {
    console.log(`server listening at port ${port}`)
})