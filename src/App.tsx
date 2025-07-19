import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'


import Login from './screens/Auth/sign-in-up/Login';
import Home from './screens/main/home/Home';
import SignUp from './screens/Auth/sign-in-up/SignUp';
import Dashboard from './screens/main/home/Dashboard';
import Posts from './screens/main/posts/Posts';

import NotifDialog from './components/dialogs/NotifDialog';
import AddPostDialog from './components/dialogs/AddPostDialog';
import ConfirmationDialog from './components/dialogs/ConfirmationDialog';


function App() {
  return (
    <Router>
      <ConfirmationDialog />
      <AddPostDialog />
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
