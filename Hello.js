// Hello.js

// 1. Define the functions that handle the requests
const sayHello = (req, res) => {
  res.send("Life is good!");
};

const sayWelcome = (req, res) => {
  res.send("Welcome to Full Stack Development!");
};

// 2. Export a function that takes the 'app' (your server) as a parameter
export default function Hello(app) {
  // 3. Tell the app to use these functions for these routes
  app.get("/hello", sayHello);
  app.get("/", sayWelcome);
}