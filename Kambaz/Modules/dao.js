import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  const findModulesForCourse = (courseId) => {
    const { modules } = db;
    return modules.filter((module) => module.course === courseId);
  };
  const createModule = (module) => {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  };
  const deleteModule = (moduleId) => {
    const { modules } = db;
    db.modules = modules.filter((module) => module._id !== moduleId);
    return { status: "deleted" };
  };
  const updateModule = (moduleId, moduleUpdates) => {
    const { modules } = db;
    db.modules = modules.map((m) =>
      m._id === moduleId ? { ...m, ...moduleUpdates } : m
    );
    return { status: "updated" };
  };
  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}