// const path = require("path");
// const express = require("express");

// const app = express();

// // server port
// const PORT = 3000;

// //use body parser
// app.use(express.json());

// /**
//  * REQUIRE IN ROUTERS HERE
//  */

// /**
//  *  Route handlers
//  */

// // handle static files
// app.use("/dist", express.static(path.join(__dirname, "../client/dist")));
// // app.use(express.static(path.join(__dirname, "../img")));

// // response with main app
// app.get("/", (req, res) =>
//   res.status(200).sendFile(path.resolve(__dirname, "../index.html"))
// );

// // catch-all route handler for any requests to an unknown route
// app.use((req, res) => res.sendStatus(404));

// //express error handler
// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: "Express error handler caught unknown middleware error",
//     status: 400,
//     message: { err: "An error occurred. Check server logs for details." }
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

// /**
//  * Start server
//  */
// app.listen(PORT, () => {
//   console.log(`Server is listening on port: ${PORT}`);
// });
