export default function QueryParameters(app) {
  const calculator = (req, res) => {
    // 1. Get variables from the query string
    const { a, b, operation } = req.query;
    let result = 0;
    
    // 2. Use a switch to decide which operation to perform
    switch (operation) {
      // GIVEN CODE
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      
      // "ON YOUR OWN" CODE (from 5.2.2.3)
      case "multiply":
        result = parseInt(a) * parseInt(b);
        break;
      case "divide":
        result = parseInt(a) / parseInt(b);
        break;
      
      // GIVEN CODE
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  };

  // 3. Create the route
  app.get("/lab5/calculator", calculator);
}