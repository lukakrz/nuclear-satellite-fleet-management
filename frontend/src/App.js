import Login from './components/Login'
import Stars from './components/Stars';
import Register from './components/Register';
import Home from './components/Home';

import { Route, Routes } from 'react-router-dom';
import { SatelliteProvider } from './context/SatelliteContext';

function App() {
  return (
    <div>
      <Stars />
      <div className="container">
        {
          !localStorage.getItem('token')
            ?
            (
              <>
                <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='register' element={<Register />} />
                </Routes>

              </>
            )
            :
            (
              <>
                <SatelliteProvider>
                  <Home />
                </SatelliteProvider>
              </>
            )
        }
      </div>
    </div>
  );
}

export default App;
