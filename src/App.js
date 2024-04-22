import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Specification} from './Specification';
import {Order} from './Order';
import { BrowserRouter, Route, Routes, NavLink, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        React JS Frontend
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/specification">
              Specification
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/order">
              Order
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
  <Route path='/home' element={<Home />} />
  <Route path='/specification' element={<Specification />} />
  <Route path='/order' element={<Order />} />
</Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;