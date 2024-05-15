import './App.css';
import CardList from './components/body/CardList';
import Carrusel from './components/carrusel/Carrusel';
import Footer from './components/footer/Footer';
import Header from './components/header/header';

function App() {
  return (
    <div>
      <Header/>
      <Carrusel/>
      <CardList/>
      <Footer/>
    </div>
  );
}

export default App;
