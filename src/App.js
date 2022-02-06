import "./App.scss";
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

      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
