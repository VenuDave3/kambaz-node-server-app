import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  
  function findMyEnrollments(userId) {
    return db.enrollments.filter((e) => e.user === userId);
  }

  function findCoursesForUser(userId) {
    const userEnrollments = findMyEnrollments(userId);
    return userEnrollments.map((enrollment) => enrollment.course);
  }

  function enrollUserInCourse(userId, courseId) {
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId, status: "ENROLLED" };
    
    // CRITICAL: Stable method for adding to the in-memory array
    db.enrollments.push(newEnrollment); 
    
    return newEnrollment;
  }

  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
  }
  
  function unenrollAllUsersFromCourse(courseId) {
    db.enrollments = db.enrollments.filter((e) => e.course !== courseId);
  }

  return { 
    enrollUserInCourse, 
    unenrollUserFromCourse, 
    findMyEnrollments,
    findCoursesForUser,
    unenrollAllUsersFromCourse, 
  };
}