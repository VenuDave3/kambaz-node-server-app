import UsersDao from "./dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

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
    const { userId } = req.params;
    const userUpdates = req.body;
    const updatedUser = dao.updateUser(userId, userUpdates);
    if (req.session["currentUser"]?._id === userId) {
      req.session["currentUser"] = updatedUser;
    }
    res.json(updatedUser);
  };
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const newUser = dao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };
  const signin = (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.status(401).json({ message: "Unable to login" });
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.sendStatus(401);
    }
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