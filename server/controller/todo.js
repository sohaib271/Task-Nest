const db=require("../model/db");

class Todo{
  async addTask(task, createdBy) {
  const todo = await db.query(
    "INSERT INTO todo(task, createdby) VALUES($1, $2) RETURNING *",
    [task, createdBy]
  );
  return todo.rows[0];
}


  async deleteTask(id){
    const delTask=await db.query("delete from todo where id=$1", [id]);
    if(delTask) return "Task Deleted";
  }

  async updateTask(id,task){
    const updTask=await db.query("update todo set task=$1 where id=$2",[task,id]);
    if(updTask) return "Todo updated";
  }

async completeTask(id, completed) {
  const updTask = await db.query(
    "UPDATE todo SET completed=$1 WHERE id=$2",
    [completed, id]
  );
  if (updTask) return "Todo updated";
}

  

  async showTodos(id){
    const showUserTodos=await db.query("select * from todo where createdBy=$1", [id]);
    return showUserTodos.rows;
  }
}

module.exports=new Todo();