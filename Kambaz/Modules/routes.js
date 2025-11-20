import ModulesDao from "../Modules/dao.js";

export default function ModulesRoutes(app, db) {
  const dao = ModulesDao(db);
  
  // --- READ (Public Access) ---
  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = dao.findModulesForCourse(courseId);
    res.json(modules);
  };
  
  // --- CREATE (Authenticated Access) ---
  const createModuleForCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId, // Link the module to the course ID
    };
    const newModule = dao.createModule(module);
    res.send(newModule);
  };
  
  // --- DELETE (Authenticated Access) ---
  const deleteModule = (req, res) => {
    // FIX 1: Add Authorization Check
    if (!req.session["currentUser"]) {
      res.sendStatus(401);
      return;
    }
    const { moduleId } = req.params;
    const status = dao.deleteModule(moduleId);
    res.send(status);
  };

  // --- UPDATE (Authenticated Access) ---
  const updateModule = (req, res) => {
    // FIX 2: Add Authorization Check
    if (!req.session["currentUser"]) {
      res.sendStatus(401);
      return;
    }
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    
    // FIX 3: Route should send back the updated object, not just a status.
    const updatedModule = dao.updateModule(moduleId, moduleUpdates); 
    res.send(updatedModule); // Send the updated module back to the client
  };

  // --- Route Definitions ---
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}