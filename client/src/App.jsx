
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"


import Home from "./pages/Home"
import Aboute from './pages/Aboute'
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Projects from "./pages/Projects"


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<Aboute/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/projects' element={<Projects/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
