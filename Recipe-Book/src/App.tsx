// styles
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';

// page components
import Create from './pages/create/Create';
import Home from './pages/home/Home';
import Recipe from './pages/recipe/Recipe';
import Search from './pages/search/Search';
import Navbar from './components/Navbar/Navbar';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import { useTheme } from './hooks/useTheme';

function App() {
  const { mode } = useTheme();

  return (
    // THIS HAS 'APP' CLASS AND EITHER 'LIGHT' CLASS OR 'DARK' CLASS
    <div className={ `App ${ mode }` }>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path='/' element={ <Home /> }></Route>
          <Route path='/create' element={ <Create /> }></Route>
          <Route path='/search' element={ <Search /> }></Route>
          <Route path='/recipes/:id' element={ <Recipe /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
