// import logo from './logo.svg';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';



function App() {
  const [isAuthenicated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element}) => {
    return isAuthenicated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={ <Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
