import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import CreateUpdateDepartment from './pages/CreateUpdateDepartment'
import ListEmployee from './pages/ListEmployee'
import ListDepartment from './pages/ListDepartment'
import CreateUpdateEmployee from './pages/CreateUpdateEmployee'

function App() {

  return (
    <>
    <BrowserRouter>
      <Header />
      
        <Routes>
          <Route path='/' element={<ListEmployee />} />
          <Route path='/employees' element={<ListEmployee />} />
          <Route path='/add-employee' element={<CreateUpdateEmployee />} />
          <Route path='/update-employee/:id' element={<CreateUpdateEmployee/>} />

          <Route path='/departments' element={<ListDepartment />} />

          <Route path='/add-department' element={<CreateUpdateDepartment />} />
          <Route path='/update-department/:id' element={<CreateUpdateDepartment/>} />
        </Routes>
      
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
