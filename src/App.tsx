import Board from "./components/Board/Board";
import Navbar from "./components/Navbar";
import './App.css'
import Movement from "./components/movement/Movement";

function App() {
  return (
    <>
    <Navbar></Navbar>
    <div id="app">
      <Movement />
    </div>
    </>
  )
}

export default App;