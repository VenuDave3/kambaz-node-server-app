import model from "./model.js";

export default function AssignmentDao(db) {
  
  const createAssignment = (assignment) => {
    // FIX: Generate a string ID (timestamp) if one isn't provided.
    // This prevents mixing ObjectIds with your String IDs.
    const newId = assignment._id || new Date().getTime().toString();
    const newAssignment = { ...assignment, _id: newId };
    return model.create(newAssignment);
  };

  const findAssignmentsForCourse = (courseId) => model.find({ course: courseId });

  const findAssignmentById = (assignmentId) => model.findById(assignmentId);

  const updateAssignment = (assignmentId, assignment) =>
    model.updateOne({ _id: assignmentId }, { $set: assignment });

  const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId });

  return {
    createAssignment,
    findAssignmentsForCourse,
    findAssignmentById,
    updateAssignment,
    deleteAssignment,
  };
}