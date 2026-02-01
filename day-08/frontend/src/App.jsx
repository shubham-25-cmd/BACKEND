import { useState } from 'react'
import axios from "axios"


function App() {
const [notes,setNotes]=useState([
  {
    title:"my title 1",
    description:"my description 1"
  },
   {
    title:"my title 1",
    description:"my description 1"
  },
   {
    title:"my title 1",
    description:"my description 1"
  },
   {
    title:"my title 1",
    description:"my description 1"
  }
])
axios.get("http://localhost:3000/api/notes")
.then((res)=>{
  setNotes(res.data.note) 
})
  return (
    <>
    <div className="notes">
      {
        notes.map(note => (
  <div className="note" key={note._id}>
    <h1>{note.title}</h1>
    <p>{note.description}</p>
  </div>
))
      }
      </div></>
  )
}

export default App;