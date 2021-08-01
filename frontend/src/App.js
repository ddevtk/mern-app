import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import './bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route exact path='/' component={HomePage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
