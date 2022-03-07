import "./App.scss";
import Navigation from "./components/Navigation";
import MainPage from "./pages/main/MainPage";
import Footer from "./components/Footer";
import ManagepentPage from "./pages/management/ManagementPage"
import LoginPage from "./pages/login/LoginPage"

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PhotoPage from "./pages/photo/PhotoPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        
        <Routes>
            
 
          <Route path="/" element={<MainPage />}/>
          <Route path="/photo" element={<PhotoPage />}/>
          <Route path="/management" element={<ManagepentPage />}/>
          <Route path="/login" element={<LoginPage />}/>

        </Routes>


      </Router>
      <Footer />
    </div>
  );
}

export default App;
