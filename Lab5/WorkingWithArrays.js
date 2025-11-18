// --- GIVEN CODE (5.2.4.1) ---
let todos = [
  { id: 1, title: "Task 1", completed: false, description: "Task 1 Description" },
  { id: 2, title: "Task 2", completed: true, description: "Task 2 Description" },
  { id: 3, title: "Task 3", completed: false, description: "Task 3 Description" },
  { id: 4, title: "Task 4", completed: true, description: "Task 4 Description" },
];

export default function WorkingWithArrays(app) {

  // --- NEW "POST" (Create) (5.2.6.1) ---
  const postNewTodo = (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  };
  app.post("/lab5/todos", postNewTodo);

  
  // --- "GET" (Read All / Filter) (5.2.4.1, 5.2.4.3) ---
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  };
  app.get("/lab5/todos", getTodos);

  // --- "GET" (Create - Old) (5.2.4.4) ---
  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  };
  app.get("/lab5/todos/create", createNewTodo);

  // --- "GET" (Read by ID) (5.2.4.2) ---
  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  };
  app.get("/lab5/todos/:id", getTodoById);

  // --- "GET" (Delete - Old) (5.2.4.5) ---
  const removeTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    todos.splice(todoIndex, 1);
    res.json(todos);
  };
  app.get("/lab5/todos/:id/delete", removeTodo);
  
  // --- "GET" (Update Title - Old) (5.2.4.6) ---
  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  };
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);

  // --- "ON YOUR OWN" (5.2.4.7) ---
  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.completed = completed === "true";
    res.json(todos);
  });
  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.description = description;
    res.json(todos);
  });
  // --- END "ON YOUR OWN" ---

  // --- NEW "DELETE" (5.2.6.2, 5.2.6.4) ---
  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  };
  app.delete("/lab5/todos/:id", deleteTodo);

  // --- NEW "PUT" (Update) (5.2.6.3, 5.2.6.4) ---
  const updateTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos = todos.map((t) => {
      if (t.id === parseInt(id)) {
        return { ...t, ...req.body };
      }
      return t;
    });
    res.sendStatus(200);
  };
  app.put("/lab5/todos/:id", updateTodo);
};