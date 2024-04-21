import { Route, Routes, useNavigate} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Hujjatlar from "./components/Hujjatlar"
import { useEffect } from "react"


function App() {
  const navigate=useNavigate()
useEffect(() => {
navigate('/')
}, [])

  return (
    <div>
      <Navbar />
      <Routes >
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hujjat" element={<Hujjatlar />} />
      </Routes>
    </div>
  )
}

export default App