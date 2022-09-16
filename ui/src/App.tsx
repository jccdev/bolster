import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
        <h1>Bolster Scan URL</h1>
        <input type={"text"} placeholder={"Enter a url to scan"}></input>
        <button>Submit</button>
    </div>
  )
}

export default App
