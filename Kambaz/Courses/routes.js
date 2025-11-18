import CoursesDao from "./dao.js";
// import EnrollmentsDao from "../Enrollments/dao.js"; // <-- COMMENT THIS OUT

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  // const enrollmentsDao = EnrollmentsDao(db); // <-- COMMENT THIS OUT

  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  };
  
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = dao.createCourse(req.body);
    // enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id); // <-- COMMENT THIS OUT
    res.json(newCourse);
  };

  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  };

  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };

  app.get("/api/courses", findAllCourses);
  app.post("/api/courses", createCourse); 
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
}