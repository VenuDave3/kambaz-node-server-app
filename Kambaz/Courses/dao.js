import { v4 as uuidv4 } from "uuid";
import EnrollmentsDao from "../Enrollments/dao.js"; 

export default function CoursesDao(db) {
  const enrollmentsDao = EnrollmentsDao(db); 

  const findAllCourses = () => db.courses;

  const createCourse = (course, userId) => {
    const newCourse = { ...course, _id: uuidv4() };
    
    // 1. Persist the new course
    db.courses.push(newCourse); 
    
    // 2. Enroll the user who created the course
    enrollmentsDao.enrollUserInCourse(userId, newCourse._id);
    
    return newCourse;
  };

  const deleteCourse = (courseId) => {
    db.courses = db.courses.filter((course) => course._id !== courseId);
    
    // Clean up all associated enrollment records
    enrollmentsDao.unenrollAllUsersFromCourse(courseId); 
    
    return { status: "deleted" };
  };

  const updateCourse = (courseId, courseUpdates) => {
    const course = db.courses.find((course) => course._id === courseId);
    if (course) {
        Object.assign(course, courseUpdates);
    }
    return course; 
  };
  
  return {
    findAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}