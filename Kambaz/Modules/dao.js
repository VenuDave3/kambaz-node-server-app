import { v4 as uuidv4 } from "uuid";
import model from "../Courses/model.js"; // Import Course Model

export default function ModulesDao(db) {
  
  // READ: Find the course by ID, then return its 'modules' array
  async function findModulesForCourse(courseId) {
    const course = await model.findById(courseId);
    if (!course) return []; // Safety check: return empty array if course not found
    return course.modules;
  }

  // CREATE: Find course by ID, push new module to 'modules' array
  async function createModule(courseId, module) {
    const newModule = { ...module, _id: uuidv4() };
    await model.updateOne(
      { _id: courseId },
      { $push: { modules: newModule } }
    );
    return newModule;
  }

  // DELETE: Find course by ID, pull module from 'modules' array by module ID
  async function deleteModule(courseId, moduleId) {
    const status = await model.updateOne(
      { _id: courseId },
      { $pull: { modules: { _id: moduleId } } }
    );
    return status;
  }

  // UPDATE: Find course, find specific sub-document, update it, and save
  async function updateModule(courseId, moduleId, moduleUpdates) {
    const course = await model.findById(courseId);
    if (!course) return null; // Safety check
    
    const module = course.modules.id(moduleId);
    if (module) {
      Object.assign(module, moduleUpdates);
      await course.save();
      return module;
    }
    return null;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}