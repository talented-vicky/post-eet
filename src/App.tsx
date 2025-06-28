import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Login from './screens/Auth/sign-in-up/Login';
import NotifDialog from './components/common/Notif';
import Home from './screens/main/home/Home';


function App() {
  return (
    <Router>
      <NotifDialog />
      <Routes>
        {/* public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />

        {/* private routes */}
      </Routes>
    </Router>
  )
}

export default App
