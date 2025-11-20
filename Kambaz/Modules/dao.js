import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  
  // --- READ ---
  function findModulesForCourse(courseId) {
    const { modules } = db;
    return modules.filter((module) => module.course === courseId);
  }
  
  // --- CREATE ---
  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    
    // Use spread operator to append the new module to the persistent array
    db.modules = [...db.modules, newModule]; 
    
    return newModule;
  }
  
  // --- DELETE ---
  function deleteModule(moduleId) {
    // Filter out the module by ID and reassign the master array
    db.modules = db.modules.filter((module) => module._id !== moduleId);
    
    // CRITICAL: Return an object/status for client confirmation
    return { status: "deleted" }; 
  }
  
  // --- UPDATE ---
  function updateModule(moduleId, moduleUpdates) {
    // Find the module object by reference
    const moduleToUpdate = db.modules.find((module) => module._id === moduleId);
    
    if (moduleToUpdate) {
      // Mutate the object in place
      Object.assign(moduleToUpdate, moduleUpdates);
      
      // CRITICAL: Return the updated object for Redux synchronization
      return moduleToUpdate; 
    }
    return { status: "not found" };
  }
  
  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}