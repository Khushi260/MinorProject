import Header from "./components/Header"
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat"
import Notfound from "./pages/Notfound"

function App() {

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>

    </main>
  )

}

export default App
