import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserDashboard from './pages/user-dashboard'
import SignUp from './pages/Signup'
import SignIn from './pages/Signin'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/dashboard' element={<UserDashboard />} />
      </Routes>
    </>
  )
}

export default App
