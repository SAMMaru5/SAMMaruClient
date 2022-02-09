import "./App.scss";
import Navigation from "./components/Navigation";
import MainPage from "./pages/main/MainPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      {/* <Router>
        
        <Routes>
            
 
          <Route path="/" element={<MainPage />}/>
        
        </Routes>


      </Router> */}
      <Navigation />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
