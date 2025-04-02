import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserDashboard from './pages/user-dashboard'
import SignUp from './pages/Signup'
import SignIn from './pages/Signin'
import Space from './components/MeetingRoom/Space'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/dashboard' element={<UserDashboard />} />
        <Route path='/room/:spaceId' element={<Space />} />
      </Routes>
    </>
  )
}

export default App
