import UsersDao from "./dao.js";
export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
  
  // All these functions are synchronous (no async/await)
  
  const createUser = (req, res) => {
    const user = dao.createUser(req.body);
    res.json(user);
  };
  const deleteUser = (req, res) => {
    const status = dao.deleteUser(req.params.userId);
    res.json(status);
  };
  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };
  const findUserById = (req, res) => {
    const user = dao.findUserById(req.params.userId);
    res.json(user);
  };
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    // Find updated user and update session
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  
  // SIGNUP
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username); // Uses 'username'
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  
  // SIGNIN
  const signin = (req, res) => {
    const { username, password } = req.body; // Destructures 'username'
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  
  // SIGNOUT
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  
  // PROFILE (Assuming async keyword was a mistake from MongoDB transition in your non-working files)
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}