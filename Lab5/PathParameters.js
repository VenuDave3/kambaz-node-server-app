export default function PathParameters(app) {
  // GIVEN CODE
  const add = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  };
  const subtract = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) - parseInt(b);
    res.send(sum.toString());
  };

  // "ON YOUR OWN" CODE
  const multiply = (req, res) => {
    const { a, b } = req.params;
    const result = parseInt(a) * parseInt(b);
    res.send(result.toString());
  };
  const divide = (req, res) => {
    const { a, b } = req.params;
    const result = parseInt(a) / parseInt(b);
    res.send(result.toString());
  };

  // GIVEN ROUTES
  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  
  // "ON YOUR OWN" ROUTES
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
};