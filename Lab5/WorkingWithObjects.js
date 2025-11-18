// --- GIVEN (5.2.3) ---
// This object lives on the server.
let assignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10", completed: false, score: 0,
};

// --- "ON YOUR OWN" (5.2.3.4) ---
// Create a new module object
let module = {
  id: "M101", name: "Intro to Node.js",
  description: "Learn the basics of Node.js and Express.",
  course: "CS5610"
};

export default function WorkingWithObjects(app) {
  
  // --- GIVEN (5.2.3) ---
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });

  // --- GIVEN (5.2.3.2) ---
  app.get("/lab5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });

  // --- GIVEN (5.2.3.3) ---
  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  // --- "ON YOUR OWN" (5.2.3.4) ---
  // Route to get module
  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });

  // Route to get module name
  app.get("/lab5/module/name", (req, res) => {
    res.json(module.name);
  });
  
  // Route to update module name
  app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  });

  // Route to update assignment score
  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore);
    res.json(assignment);
  });

  // Route to update assignment completed
  app.get("/lab5/assignment/completed/:newCompleted", (req, res) => {
    const { newCompleted } = req.params;
    assignment.completed = newCompleted === "true";
    res.json(assignment);
  });
  
  // Route to update module description
  app.get("/lab5/module/description/:newDescription", (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.json(module);
  });
  // --- END "ON YOUR OWN" ---
};