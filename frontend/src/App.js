import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SingleProductPage from './pages/SingleProductPage';
import './bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/product/:id' component={SingleProductPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
