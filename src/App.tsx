import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Login from './screens/Auth/sign-in-up/Login';
import NotifDialog from './components/dialogs/Notif';
import Home from './screens/main/home/Home';
import SignUp from './screens/Auth/sign-in-up/SignUp';
import Dashboard from './screens/main/home/Dashboard';
import Posts from './screens/main/posts/Posts';


function App() {
  return (
    <Router>
      <NotifDialog />
      <Routes>
        {/* public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        {/* private routes */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/posts' element={<Posts />} />
      </Routes>
    </Router>
  )
}

export default App
