import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js"; 

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  // --- READ (All Courses - Unfiltered) ---
  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  };
  
  // --- 2. READ (Dashboard Filter - Fixes the 8/2 course issue) ---
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    
    // Authorization Check
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    
    // Data Filtering Logic
    const enrolledCourseIds = enrollmentsDao.findCoursesForUser(userId); 
    const enrolledCourses = db.courses.filter((course) => 
      enrolledCourseIds.includes(course._id)
    );
    
    res.json(enrolledCourses);
  };

  // --- 3. CREATE (Add New Course - The working logic) ---
  const createCourse = (req, res) => {
    // Authorization Check
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    // CRITICAL: Pass BOTH arguments to the DAO for creation and enrollment
    const newCourse = dao.createCourse(req.body, currentUser._id);
    res.json(newCourse);
  };

  // --- 4. DELETE (Remove Course) ---
  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    dao.deleteCourse(courseId); 
    res.sendStatus(200);
  };

  // --- 5. UPDATE (Edit Course Details) ---
  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };

  // --- Route Definitions ---
  app.get("/api/courses", findAllCourses);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  
  // CRITICAL: Dashboard Filter Route (Fixes the 8 course issue)
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  
  // CRITICAL: Add Course Route (Fixes the adding issue)
  app.post("/api/users/current/courses", createCourse); 
}