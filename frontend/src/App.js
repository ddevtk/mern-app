import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SingleProductPage from './pages/SingleProductPage';
import './bootstrap.min.css';
import CartPage from './pages/CartPage';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/product/:id' component={SingleProductPage} />
          <Route exact path='/cart/:id?' component={CartPage} />
        </Container>
      </main>
      <Footer />
      <BackToTop />
    </Router>
  );
}

export default App;
