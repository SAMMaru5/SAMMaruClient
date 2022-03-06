import "./App.scss";
import Navigation from "./components/Navigation";
import MainPage from "./pages/main/MainPage";
import Footer from "./components/Footer";
import ManagepentPage from "./pages/management/ManagementPage"

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PhotoPage from "./pages/photo/PhotoPage";

import NoticePage from "./pages/notice/NoticePage";

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

        </Routes>


      </Router>
      <Footer />
    </div>
  );
}

export default App;
