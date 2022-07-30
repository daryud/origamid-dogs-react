import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { UserProvider } from './contexts/UserContext';
import './styles/global.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
