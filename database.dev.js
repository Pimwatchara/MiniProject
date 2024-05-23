"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var express = require("express");

var bodyParser = require("body-parser");

var mysql = require("mysql2/promise");

var path = require("path");

var app = express(); // Middleware

app.use(bodyParser.urlencoded({
  extended: false
})); // Parse form data

app.use(bodyParser.json()); // Parse JSON data
// MySQL connection

var dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // Replace with your MySQL username
  password: '',
  // Replace with your MySQL password
  database: 'student_database',
  port: 3306 // Default MySQL port

}); // Serve the student.html file

app.get("/students", function (req, res) {
  res.sendFile(path.join(__dirname, 'student.html'));
}); // Handle POST request to add student

app.post("/students", function _callee(req, res) {
  var _req$body, name, age, phone, email, connection, _ref, _ref2, rows;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, age = _req$body.age, phone = _req$body.phone, email = _req$body.email;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(dbConn);

        case 4:
          connection = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(connection.query("INSERT INTO students (name, age, phone, email) VALUES (?, ?, ?, ?)", [name, age, phone, email]));

        case 7:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];
          res.status(201).send(rows);
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          console.error('Error:', _context.t0);
          res.status(500).send('Failed to add student');

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
}); // Start the server

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});