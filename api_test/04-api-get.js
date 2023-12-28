const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const students = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "vana@example.com",
    phone: "123456789",
    gpa: 3.5,
    status: "Active",
  },
  {
    id: 2,
    name: "Tran Thi B",
    email: "thib@example.com",
    phone: "0987654321",
    gpa: 3.2,
    status: "Inactive",
  },
];

app.get("/api/students", (req, res) => res.json(students));

app.post("/api/students", (req, res) => {
  const newStudent = req.body;
  newStudent.id = students.length + 1; // Assign a new ID
  students.push(newStudent);
  res.json({ success: true, student: newStudent });
});

app.use("*", (req, res) =>
  res.send(
    `<p>Use a tool like <a href="https://www.getpostman.com">Postman</a>` +
      ` or <a href="https://curl.haxx.se/">curl</a> to try the following:</p>` +
      `<pre>` +
      `GET /api/students\n` +
      `POST /api/students\n` +
      `  with body: { "name": "New Student", "email": "newstudent@example.com", "phone": "123456789", "gpa": 3.8, "status": "Active" }\n` +
      `GET /api/students`
  )
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`));
