const router=require("express").Router(),
Transaction=require("../models/transaction.js");

router.post("/api/transaction",
({body:t},s)=>{Transaction.create(t).then(t=>{s.json(t)}).catch(t=>{s.status(404).json(t)})}),

router.post("/api/transaction/bulk",
({body:t},s)=>{Transaction.insertMany(t).then(t=>{s.json(t)}).catch(t=>{s.status(404).json(t)})}),

router.get("/api/transaction",
(t,s)=>{Transaction.find({}).sort({
    date:-1}).then(t=>{s.json(t)}).catch(t=>{s.status(404).json(t)})}),

module.exports=router;