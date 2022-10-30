import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import "./App.css";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Register from './components/Register'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
