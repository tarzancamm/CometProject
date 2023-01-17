import './App.css';
import {useContext} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import Header from './components/PermanentLayout/Header';
import Footer from './components/PermanentLayout/Footer';
import HomeScreen from './screens/HomeScreen'
import AuthScreen from './screens/AuthScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import AuthContext from "./store/authContext";

function App() {
  const {token} = useContext(AuthContext)

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={token ? <HomeScreen/> : <Navigate to='/auth'/>} />
        <Route path='/auth' element={<AuthScreen/>} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/products/:id' element={token ? <ProductDetailsScreen /> : <Navigate to='/auth'/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
