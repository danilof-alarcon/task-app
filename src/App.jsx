import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import DashboardPage from './pages/Dashboard'
import NotFoundPage from './pages/NotFound'
import TaskForm from './pages/TaskForm'
import { DataContextProvider } from './context/DataContextProvider'


function App() {

  return (
    <DataContextProvider>

      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/dashboard' element={<DashboardPage />}/>
          <Route path='/new' element={<TaskForm />}/>
          <Route path='/edit/:id' element={<TaskForm />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </Router>
      
    </DataContextProvider>
  )
}

export default App