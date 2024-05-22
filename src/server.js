require("dotenv").config(); 

const express = require("express");
const initMiddleware = require("./config/middleware");
const initRoutes = require("./routes");
const app = express();

// Middleware
initMiddleware(app)

//Database

//Routes
initRoutes(app)

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
   console.log(err.stack);
   console.log(err.name);
   console.log(err.code);

   res.status(500).json({
      message: "Something went rely wrong",
   });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));