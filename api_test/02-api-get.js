const express = require("express");
const app = express();

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

app.use("*", (req, res) =>
  res.send('List students <a href="/api/students">/api/students</a>!')
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`));
