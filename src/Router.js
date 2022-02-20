import "./App.scss";
import Navigation from "./components/Navigation";
import MainPage from "./pages/main/MainPage";
import Footer from "./components/Footer";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PhotoPage from "./pages/photo/PhotoPage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
        
        <Routes>
            
 
          <Route path="/" element={<MainPage />}/>
          <Route path="/photo" element={<PhotoPage />}/>
        
        </Routes>


      </Router>
      <Footer />
    </div>
  );
}

export default App;
