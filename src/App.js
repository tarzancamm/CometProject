import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'

import Header from './components/PermanentLayout/Header';
import Footer from './components/PermanentLayout/Footer';
import HomeScreen from './screens/HomeScreen'
import AuthScreen from './screens/AuthScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/auth' element={<AuthScreen/>} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/products/:id' element={<ProductDetailsScreen />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
