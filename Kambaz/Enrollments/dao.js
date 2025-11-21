import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  
  function findMyEnrollments(userId) {
    return db.enrollments.filter((e) => e.user === userId);
  }

  // NEW FUNCTION: Returns the list of all enrollment records
  function findAllEnrollments() {
    return db.enrollments; 
  }

  function findCoursesForUser(userId) {
    const userEnrollments = findMyEnrollments(userId);
    // Returns an array of course IDs
    return userEnrollments.map((enrollment) => enrollment.course);
  }
  
  // New/Updated: Enrolls a user in a course
  function enrollUserInCourse(userId, courseId) {
    // Check if enrollment already exists to prevent duplicates (good practice)
    const existing = db.enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (existing) return existing; 

    // Create a new enrollment record
    const newEnrollment = { 
      _id: uuidv4(), 
      user: userId, 
      course: courseId, 
      status: "ENROLLED" 
    };
    
    db.enrollments.push(newEnrollment); 
    
    return newEnrollment;
  }

  // New/Updated: Removes a single enrollment record
  function unenrollUserFromCourse(userId, courseId) {
    // Overwrite the enrollments array, filtering out the matching record
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
  }
  
  // Used by Courses DAO when a course is deleted
  function unenrollAllUsersFromCourse(courseId) {
    db.enrollments = db.enrollments.filter((e) => e.course !== courseId);
  }

  return { 
    enrollUserInCourse, 
    unenrollUserFromCourse, 
    findAllEnrollments, 
    findMyEnrollments,
    findCoursesForUser,
    unenrollAllUsersFromCourse, 
  };
}