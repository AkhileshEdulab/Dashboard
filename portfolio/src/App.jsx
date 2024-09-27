
import {BrowserRouter as Router,  Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import ProjectView from './pages/ProjectView'
import Footer from './pages/Footer'
import { ThemeProvider } from './components/theam-provider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
 

  return (
    <>
       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        
        <Routes>
          <Route path='/' element={<Home />}>Home</Route>
          <Route path='/project/:id' element={<ProjectView />}>Home</Route>
        </Routes>
        <Footer/>
        <ToastContainer position='bottom-right theam-dark'/>
      </Router>
    </ThemeProvider>
    </>
  )
}

export default App
