const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// this is necessary to parse form responses
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
    status: "active",
  },
];

app.get("/api/students", (req, res) => res.json(students));

app.put("/api/student/:id", (req, res) => {
  const p = students.find((p) => p.id === parseInt(req.params.id));

  if (!p) return res.status(410).json({ error: "No such tour exists" });

  if (req.body.name) p.name = req.body.name;
  if (req.body.email) p.email = req.body.email;
  if (req.body.phone) p.phone = req.body.phone;
  if (req.body.gpa) p.gpa = req.body.gpa;
  if (req.body.status) p.status = req.body.status;

  res.json({ success: true });
});

app.use("*", (req, res) =>
  res.send(
    `<p> Use a tool like <a href="https://www.getpostman.com/">Postman</a>` +
      `or <a href="https://curl.haxx.se/">curl</a>to try the following:</p>` +
      `<pre>` +
      `Get/api/students\n` +
      `Put/api/students/0 with JSON body {"price": 129.99}\n` +
      `Get/api/students`
  )
);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`));
