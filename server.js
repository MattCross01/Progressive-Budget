const express=require("express")
logger=require("morgan")
mongoose=require("mongoose")
compression=require("compression")

PORT=process.env.PORT||3e3,app=express();

app.use(logger("dev")),
app.use(compression()),
app.use(express.urlencoded({extended:!0})),
app.use(express.json()),
app.use(express.static("public"));

var MONGODB_URI=process.env.MONGODB_URI||"mongodb://localhost/budget";

mongoose.connect(MONGODB_URI),

app.use(require("./routes/api.js")),
app.listen(PORT,
    ()=>{console.log(`App running on port ${PORT}!`)});
    