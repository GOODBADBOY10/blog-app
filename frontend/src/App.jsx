import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Projects from './pages/Projects'
import Header from './components/Header'
import Footers from './components/Footers'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/CreatePost'
import OnlyAdminPrivate from './components/OnlyAdminPrivate'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'

function App() {

  return (
      <BrowserRouter>
      
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/project" element={<Projects/>} />
          <Route element={<OnlyAdminPrivate />}>
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:postId' element={<UpdatePost />} />
          </Route>
          <Route path='/post/:postSlug' element={<PostPage />} />
        </Routes>
        <Footers />
        
      </BrowserRouter>
  )
}

export default App
