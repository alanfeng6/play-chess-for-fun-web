import Board from "./components/Board/Board";
import Navbar from "./components/Navbar";
import './App.css'

function App() {
  return (
    <>
    <Navbar></Navbar>
    <div id="app">
      <Board></Board>
    </div>
    </>
  )
}

export default App;