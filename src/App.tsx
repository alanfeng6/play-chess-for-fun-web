import Button from "./components/Button";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <>
    {showAlert && <Alert onClose={() => setShowAlert(false)}>My alert</Alert>}
    <Button onClick={() => setShowAlert(true)}>Button</Button>
    </>
  )
}

export default App;