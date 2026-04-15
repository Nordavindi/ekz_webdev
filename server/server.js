import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

let students = [
    {
      id: 1,
      name: "Vova",
      group: "A1",
      photo: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Neck hurt",
      group: "A1",
      photo: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 3,
      name: "Maxim Petya",
      group: "B1",
      photo: "https://randomuser.me/api/portraits/men/12.jpg"
    }
];

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/students", (req, res) => {
    const { group } = req.query;
  
    if (!group) {
      return res.status(400).json({ error: "Group is required" });
    }
  
    const filtered = students.filter(s => s.group === group);
    res.json(filtered);
  });

  app.post("/students", (req, res) => {
    const { name, group, photo } = req.body;
  
    if (
      typeof name !== "string" || name.length < 3 ||
      typeof group !== "string" || group.length < 1 ||
      typeof photo !== "string" || photo.length < 5
    ) {
      return res.status(400).json({ error: "Invalid data" });
    }
  
    const newStudent = {
      id: Date.now(),
      name,
      group,
      photo
    };
  
    students.push(newStudent);
    res.status(201).json(newStudent);
  });