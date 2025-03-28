import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './components/Signup'
import SignIn from './components/Signin'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
