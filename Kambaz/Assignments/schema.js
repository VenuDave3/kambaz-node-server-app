import mongoose from "mongoose";



const assignmentSchema = new mongoose.Schema(

  {

    _id: String, // <--- CRITICAL FIX: Force ID to be a String

    title: String,

    course: String,

    description: String,

    points: Number,

    dueDate: Date,

    availableFromDate: Date,

    availableUntilDate: Date,

  },

  { collection: "assignments" }

);



export default assignmentSchema;