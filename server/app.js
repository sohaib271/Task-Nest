const express=require("express");
const cors=require("cors");
const app=express();
const {userRouter,todoRouter}=require("./routes/handler");

app.use(cors({
   origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

app.use("/user",userRouter);
app.use("/todo",todoRouter);

const port=process.env.PORT;

app.listen(port,()=>console.log("Server Started"));