import React from 'react'
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import Home from './page/Home'
import NullPage from './page/NullPage'
import Admin from './page/Admin'
import Login from './admin/Login'
import AddNews from './components/AddNews'
import Detail from './page/Detail'
import Popular from './page/Popular'
import IT from './page/IT'
function App() {
  return (
    <Router>
      <Routes>
           <Route path='/' element={<Home />} />
           <Route path='/detail/viewpost/:postid' element={<Detail/>} />
           <Route path='/cs-admin' element={<Admin />} />
           <Route path='/popular' element={<Popular />} />
           <Route path="/it" element={<IT/>}/>
           <Route path='/admin-login' element={<Login />}/>
           <Route path='/cs-admin/add-news' element={<AddNews />}/>
           <Route path='*' element={<NullPage />} />
      </Routes>
    </Router>
  )
}

export default App

