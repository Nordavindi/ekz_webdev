import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [group, setGroup] = useState("A1");

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const fetchData = async () => {
    const res = await fetch(`http://localhost:5000/students?group=${group}`);
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchData();
  }, [group]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, group, photo })
    });

    if (res.ok) {
      setName("");
      setPhoto("");
      fetchData();
    }
  };

  return (
    <div className="container">
      <h1>Students</h1>

      <input
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        placeholder="Group"
      />

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Photo URL"
        />
        <button type="submit">Add</button>
      </form>

      <div className="list">
        {students.map((s) => (
          <div key={s.id} className="card">
            <img src={s.photo} alt={s.name} />
            <p>{s.name}</p>
            <p>{s.group}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;