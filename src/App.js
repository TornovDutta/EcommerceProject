import { AllRouter } from "./routers/AllRouter";
import { Header, Footer } from "./components";
import { ScrollToTop } from "./components/Other/ScrollToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App dark:bg-dark">
      <Header />
      <ScrollToTop />
      <ToastContainer closeButton={false} autoClose={3000} position={"bottom-right"} />
      <AllRouter />
      <Footer />
    </div>
  );
}

export default App;
