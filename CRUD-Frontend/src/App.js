import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path="/update/:id"  element={<Update/>}></Route>
        <Route path="/delete/:id" element={<Home/>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App;
