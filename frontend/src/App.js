import { Container } from 'react-bootstrap';

import Footer from './components/Footer';
import Header from './components/Header';
import './bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Hello world</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
