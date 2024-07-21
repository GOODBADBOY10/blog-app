import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/Logout'
import Projects from './pages/Projects'
import Header from './components/Header'

function App() {

  return (
      <BrowserRouter>
      
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<SignUp />} />
          <Route path="/project" element={<Projects/>} />
        </Routes>
        
      </BrowserRouter>
  )
}

export default App
