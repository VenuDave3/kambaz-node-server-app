import EnrollmentsDao from "./dao.js";
import CoursesDao from "../Courses/dao.js"; 

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const coursesDao = CoursesDao(db); 

  // --- READ: Find Courses for Current User (Dashboard Filter Logic) ---
  const findMyCourses = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    // Get the array of enrolled course IDs
    const enrolledCourseIds = dao.findCoursesForUser(currentUser._id);
    
    // Filter the master courses list using the IDs
    const enrolledCourses = db.courses.filter((course) => 
      enrolledCourseIds.includes(course._id)
    );

    res.json(enrolledCourses);
  };

  // --- Other Enrollment/Unenrollment Logic Omitted for Brevity ---

  // --- Route Definitions ---
  
  // CRITICAL: This route defines the authenticated Dashboard filter endpoint
  app.get("/api/users/current/courses", findMyCourses); 
}