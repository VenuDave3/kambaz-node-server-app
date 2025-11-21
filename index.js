import "dotenv/config";
import express from 'express';
import cors from "cors";
import session from "express-session"; 

// --- Core Route/Data Imports ---
// IMPORTANT: These paths assume 'index.js' is in the root (kambaz-node-server-app/)
// and that 'Kambaz', 'Lab5', and 'Hello.js' are siblings to index.js.

// Generic Files
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";

// Data/Route Files (Under the 'Kambaz' folder)
import db from "./Kambaz/Database/index.js"; 
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js"; // New: For Assignment CRUD
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
// --- End Imports ---


const app = express();
app.set("trust proxy", 1);
// --- 1. CORS Configuration ---
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

// --- 2. Session Configuration ---
// NOTE: We cast sessionOptions to 'any' here since the express-session types 
// conflict with our conditional environment setup in TypeScript contexts.
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

// Conditional secure settings for production (non-local) environments
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    // domain: process.env.SERVER_URL,
  };
}

console.log(sessionOptions);
app.use(session(sessionOptions));

// --- 3. Body Parser (Must be after CORS and Session) ---
app.use(express.json()); 

// --- 4. Route Registration (Pass 'app' and 'db' to all data-handling modules) ---
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app,db)
AssignmentRoutes(app, db);  
EnrollmentRoutes(app, db);

// Legacy/Simple Routes
Lab5(app);
Hello(app);
// --- End Route Registration ---

// --- 5. Start Server ---
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server listening on port ${process.env.PORT || 4000}`);
});