import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };
  
  // ✅ ADDED: Route handler for retrieving a single assignment
  const findAssignmentById = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignmentById(assignmentId);
    
    if (!assignment) {
      return res.sendStatus(404); // Not Found
    }
    res.json(assignment);
  };

  const createAssignment = (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = dao.createAssignment(assignment);
    res.send(newAssignment);
  };

  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    res.send(status);
  };

  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const updates = req.body;
    const updated = dao.updateAssignment(assignmentId, updates); // Returns the updated object or null
    
    if (!updated) {
      return res.sendStatus(404);
    }
    res.json(updated); // ✅ Send back the updated object for Redux sync
  };

  app.get(  "/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get(  "/api/assignments/:assignmentId",      findAssignmentById); 
  app.post( "/api/courses/:courseId/assignments", createAssignment);
  app.delete("/api/assignments/:assignmentId",    deleteAssignment);
  app.put(  "/api/assignments/:assignmentId",   updateAssignment);
}