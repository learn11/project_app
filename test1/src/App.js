
import { BrowserRouter as Router, Route, Routes }
    from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Edmon from './pages/input';
import Navbar from './components/UI/navbar/navbar';




function App() {
  return (
      <Router>
            <Routes>
            <Route path='/home' element={<Home/>}/>
            </Routes>
            <Routes>
            <Route path='/about' element={<About/>}/>
            </Routes>
            <Routes>
            <Route path='/input' element={<Edmon/>}/>
            </Routes><Navbar/>
    </Router>
    
  )
}

export default App;
