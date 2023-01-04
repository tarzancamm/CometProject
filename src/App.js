import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'

import Header from './components/PermanentLayout/Header';
import HomeScreen from './components/Home/HomeScreen'
import Auth from './components/PermanentLayout/Auth'

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path = '*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
