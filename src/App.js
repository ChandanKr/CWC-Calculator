import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Calculator1 from './pages/Calculator1';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calc1" element={<Calculator1 />} />
        <Route path="/calc2" element={<div>Calculator 2 Page</div>} />
        <Route path="/calc3" element={<div>Calculator 3 Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
