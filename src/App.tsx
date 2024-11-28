import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './components/Layout'
import AnimalsList from './components/AnimalsList'
import Home from './components/Home'
import AddAnimal from './components/AddAnimal'
import AnimalDetails from './components/AnimalDetails'
import EditAnimal from './components/EditAnimal'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />}/>
          <Route path='/animals' element={<AnimalsList />}/>
          <Route path='/details/:id' element={<AnimalDetails />}/>
          <Route path='/add' element={<AddAnimal />}/>
          <Route path='/edit/:id' element={<EditAnimal />}/>
          <Route path='/*' element={<h1>not Found</h1>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App