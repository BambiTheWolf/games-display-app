import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './components/Homepage';
import GameOfLife from './components/GameOfLife';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/GameOfLife' element={<GameOfLife />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
