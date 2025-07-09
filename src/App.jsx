import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import Homepage from './components/Homepage'
import Education from './components/Education'
import PersonalDetails from './components/PersonalDetails'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Jobmatch from './components/Jobmatch'
import Results from './components/Results'


function App() {
  

  return (
    <>
    <BrowserRouter basename='/AiResume/'>
    <Routes>
      <Route path='/' element={<Homepage />}></Route>
      <Route path='/personal' element = {<PersonalDetails />}></Route>
      <Route path='/education' element = {<Education></Education>}></Route>
      <Route path = '/skills' element = {<Skills></Skills>}></Route>
      <Route path = '/certifications' element = {<Certifications></Certifications>}></Route>
      <Route path='/jobdesc' element = {<Jobmatch></Jobmatch>}></Route>
      <Route path='/results' element = {<Results></Results>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
