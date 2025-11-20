import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  
  const findAssignmentsForCourse = (courseId) => {
    const { assignments } = db;
    return assignments.filter((a) => a.course === courseId);
  };
  
  // ✅ ADDED: Function to find a single assignment by its ID
  const findAssignmentById = (assignmentId) => {
    return db.assignments.find((a) => a._id === assignmentId);
  };
  
  const createAssignment = (assignment) => {
    // Note: Assuming 'assignment' coming in already has 'course' property from the route
    const newAssignment = { 
      ...assignment, 
      _id: uuidv4(),
      title: assignment.title ?? "New Assignment",
      // You should add defaults for other properties here too (e.g., points, dates)
    };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  };
  
  const deleteAssignment = (assignmentId) => {
    db.assignments = db.assignments.filter((a) => a._id !== assignmentId);
    return { status: "deleted" };
  };
  
  const updateAssignment = (assignmentId, assignmentUpdates) => {
    let targetAssignment = db.assignments.find((a) => a._id === assignmentId);
    if (!targetAssignment) return null; // Return null if not found (good practice)
    
    // Efficiently merge all updates into the existing assignment
    Object.assign(targetAssignment, assignmentUpdates); 
    
    // Note: Since you're mapping over the array in routes.js, you might not strictly 
    // need this map operation in the DAO if you're using 'targetAssignment' directly.
    // However, the object reference should carry the changes.
    return targetAssignment;
  };

  return {
    findAssignmentsForCourse,
    findAssignmentById, // ⬅️ NOW AVAILABLE
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}