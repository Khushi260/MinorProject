import express from "express";

const app = express();

// GET - 
// PUT
// POST 
// DELETE


//middleware
app.use(express.json())

app.post("/")

app.get("/hello",(req,res,next)=>{
   return res.send("Hello");
});

app.listen(5000,()=>console.log("Server Open"));