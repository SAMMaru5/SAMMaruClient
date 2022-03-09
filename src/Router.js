import "./App.scss";
import Navigation from "./components/Navigation";
import MainPage from "./pages/main/MainPage";
import Footer from "./components/Footer";
import ManagepentPage from "./pages/management/ManagementPage"
import LoginPage from "./pages/login/LoginPage"
import RegisterPage from "./pages/register/RegisterPage"
import AgreePage from "./pages/register/AgreePage"
import FindUserPage from "./pages/findUser/FindUserPage"

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PhotoPage from "./pages/photo/PhotoPage";

import NoticePage from "./pages/notice/NoticePage";

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        
        <Routes>
            
 
        <Route path="/" element={<MainPage />}/>
          <Route path="/photo" element={<PhotoPage />}/>
          <Route path="/notice" element={<NoticePage />}/>
          <Route path="/management" element={<ManagepentPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/agree" element={<AgreePage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/findUser" element={<FindUserPage />}/>

        </Routes>


      </Router>
      <Footer />
    </div>
  );
}

export default App;
