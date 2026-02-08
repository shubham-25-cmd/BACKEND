import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    axios
      .get("http://localhost:3000/api/notes")
      .then((res) => setNotes(res.data.notes || []))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        fetchNotes();
        e.target.reset();
      })
      .catch((err) => console.log(err));
  };

  // ✅ DELETE NOTE
  const handleDelete = (noteId) => {
    axios
      .delete(`http://localhost:3000/api/notes/${noteId}`)
      .then(() => {
        fetchNotes(); // refresh after delete
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form className="note-create_form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter title" required />
        <input
          name="description"
          type="text"
          placeholder="Enter description"
          required
        />
        <button type="submit">Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={() => handleDelete(note._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
