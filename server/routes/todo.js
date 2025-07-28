const express=require("express");
const router=express.Router();
const todo=require("../controller/todo");

router.post("/add",async(req,res)=>{
  const {task,createdby}=req.body;
  try {
    const addTodo=await todo.addTask(task,createdby);
    return res.json({todo:addTodo});
  } catch (error) {
     return res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id;

  try {
    const deleteTask=await todo.deleteTask(id);
    return res.json({deleteTask});
  } catch (error) {
     return res.status(400).json({ error: error.message });
  }
});

router.patch("/edit/:id",async(req,res)=>{
  const id=req.params.id;
  const task=req.body;

  try {
    const update=await todo.updateTask(id,task);
    return res.json({update});
  } catch (error) {
     return res.status(400).json({ error: error.message });
  }
});

router.patch("/completed/:id", async (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;

  try {
    const update = await todo.completeTask(id, completed);
    return res.json({ update });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


router.get("/mytodos/:id",async(req,res)=>{
  const userId=req.params.id;
  try {
    const myTodos=await todo.showTodos(userId);
    return res.json({myTodos});
  } catch (error) {
     return res.status(400).json({ error: error.message });
  }
});

module.exports=router;