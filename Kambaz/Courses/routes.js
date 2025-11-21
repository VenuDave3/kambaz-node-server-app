import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js"; 

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  // --- READ (All Courses - Unfiltered) ---
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses(); // Added await
    res.send(courses);
  };
  
  // --- 2. READ (Dashboard Filter) ---
  const findCoursesForEnrolledUser = async (req, res) => { // Added async
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
    // Enrollment DAO functions should now be awaited
    const enrolledCourseIds = await enrollmentsDao.findCoursesForUser(userId); 
    const enrolledCourses = db.courses.filter((course) => 
      enrolledCourseIds.includes(course._id)
    );
    
    res.json(enrolledCourses);
  };

  // --- 3. CREATE (Add New Course) ---
  const createCourse = async (req, res) => { // Added async
    // Authorization Check
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    // CRITICAL: Pass BOTH arguments to the DAO for creation and enrollment
    const newCourse = await dao.createCourse(req.body, currentUser._id); // Added await
    res.json(newCourse);
  };

  // --- 4. DELETE (Remove Course) ---
  const deleteCourse = async (req, res) => { // Added async
    const { courseId } = req.params;
    await dao.deleteCourse(courseId); // Added await
    res.sendStatus(200);
  };

  // --- 5. UPDATE (Edit Course Details) ---
  const updateCourse = async (req, res) => { // Added async
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates); // Added await
    res.send(status);
  };

  // --- Route Definitions ---
  app.get("/api/courses", findAllCourses);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  
  // Dashboard Filter Route
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  
  // Add Course Route
  app.post("/api/users/current/courses", createCourse); 
}