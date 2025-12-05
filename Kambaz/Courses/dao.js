import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {
  
  const findAllCourses = async () => {
    return model.find();
  };

  const createCourse = (course) => {
    delete course._id;
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  };

  // 6.4.3.3: Delete Course from MongoDB
  const deleteCourse = (courseId) => {
    return model.deleteOne({ _id: courseId });
  };

  const updateCourse = (courseId, courseUpdates) => {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  };

  return {
    findAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}