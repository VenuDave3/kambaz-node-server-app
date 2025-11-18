import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  const findAssignmentsForCourse = (courseId) => {
    const { assignments } = db;
    return assignments.filter((a) => a.course === courseId);
  };
  const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  };
  const deleteAssignment = (assignmentId) => {
    db.assignments = db.assignments.filter((a) => a._id !== assignmentId);
    return { status: "deleted" };
  };
  const updateAssignment = (assignmentId, assignmentUpdates) => {
    db.assignments = db.assignments.map((a) =>
      a._id === assignmentId ? { ...a, ...assignmentUpdates } : a
    );
    return { status: "updated" };
  };
  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}