import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import MovieData from './MovieData'
const App = () => {


  return (
    <Router >
      <Routes>
        <Route exact path='/' element={<MovieData />} />
        <Route path='/*' element={<h2>Error</h2>} />
      </Routes>
    </Router>


  )
}

export default App