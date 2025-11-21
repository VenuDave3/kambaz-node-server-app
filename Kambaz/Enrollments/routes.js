import EnrollmentsDao from "./dao.js";
// You may still need to import db from your database index if db isn't implicitly in scope
// import db from "../Database/index.js"; 

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  
  // --- Helper to get User ID (Handles 'current') ---
  const getCurrentUserId = (req) => {
    let { uid } = req.params;
    
    // Check if the user is asking for the currently logged-in user
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) return null; // 401 will be sent by caller
      uid = currentUser._id;
    }
    return uid;
  }
  
  // ✅ NEW HANDLER: READ - Find All Enrollments (Stops the 404)
  const findAllEnrollmentsApi = (req, res) => {
    // This calls the newly added function in the DAO
    const enrollments = dao.findAllEnrollments(); 
    res.json(enrollments);
  };
  
  // --- READ: Find Courses for Current User (Dashboard Filter Logic) ---
  const findMyCourses = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    const enrolledCourseIds = dao.findCoursesForUser(currentUser._id);
    
    const enrolledCourses = db.courses.filter((course) => 
      enrolledCourseIds.includes(course._id)
    );

    res.json(enrolledCourses);
  };
  
  // ✅ CREATE - Enroll User in a Course
  const enrollUser = async (req, res) => {
    const cid = req.params.cid;
    let uid = getCurrentUserId(req);

    if (!uid) return res.sendStatus(401);

    const newEnrollment = await dao.enrollUserInCourse(uid, cid);
    res.json(newEnrollment); 
  };
  
  // ✅ DELETE - Unenroll User from a Course
  const unenrollUser = async (req, res) => {
    const cid = req.params.cid;
    let uid = getCurrentUserId(req);

    if (!uid) return res.sendStatus(401);

    await dao.unenrollUserFromCourse(uid, cid);
    res.sendStatus(200); 
  };
  
  // --- Route Definitions ---
  
  app.get("/api/enrollments", findAllEnrollmentsApi);
  app.get("/api/users/current/courses", findMyCourses); 
  app.post("/api/users/:uid/courses/:cid", enrollUser);
  app.delete("/api/users/:uid/courses/:cid", unenrollUser);
}