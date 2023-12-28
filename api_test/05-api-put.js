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
    status: "nactive",
  },
];

app.get("/api/students", (req, res) => res.json(students));

app.delete("/api/student/:id", (req, res) => {
  const idx = students.findIndex(
    (student) => student.id === parseInt(req.params.id)
  );
  if (idx < 0) return res.json({ error: "No such student exists." });
  students.splice(idx, 1);
  res.json({ success: true });
});

app.use("*", (req, res) =>
  res.send(
    `<p>Use a tool like <a href="https://www.getpostman.com">Postman</a>` +
      ` or <a href="https://curl.haxx.se/">curl</a> to try the following:</p>` +
      `<pre` +
      `GET /api/students\n` +
      `DELETE /api/student/0\n` +
      `GET /api/students`
  )
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`));
