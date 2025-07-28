
class Todo{
  async add(task,createdby){
    const response=await fetch("http://localhost:8000/todo/add",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({task:task,createdby:createdby})});
    try {
      const result=await response.json();
      console.log(result)
      if(result.todo) return result;
    } catch (error) {
      return error.message;
    }
  }

  async remove(id){
    const response=await fetch(`http://localhost:8000/todo/delete/${id}`, {method:"DELETE"});
    try {
      const result=await response.json();
      if(result.deleteTask) return result;
    } catch (error) {
      return error.message;
    }
  }

  async userTodos(id){
    const response=await fetch(`http://localhost:8000/todo/mytodos/${id}`, {method:"GET"});

    try {
      const result=await response.json();
      return result.myTodos;
    } catch (error) {
      return [];
    }
  }

  async complete(id, completed) {
  const response = await fetch(`http://localhost:8000/todo/completed/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed })
  });

  try {
    const result = await response.json();
    console.log(result);
    if (result.update) return result;
  } catch (error) {
    return error.message;
  }
}

}

export default new Todo();