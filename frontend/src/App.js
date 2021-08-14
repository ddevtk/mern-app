import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SingleProductPage from './pages/SingleProductPage';
import './bootstrap.min.css';
import CartPage from './pages/CartPage';
import BackToTop from './components/BackToTop';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetail from './pages/OrderDetail';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/product/:id' component={SingleProductPage} />
          <Route exact path='/cart/:id?' component={CartPage} />
          <Route exact path='/login'>
            {localStorage.getItem('userInfo') ? (
              <Redirect to='/' />
            ) : (
              <LoginPage />
            )}
          </Route>
          <Route exact path='/register'>
            {localStorage.getItem('userInfo') ? (
              <Redirect to='/' />
            ) : (
              <RegisterPage />
            )}
          </Route>
          <Route exact path='/profile'>
            {localStorage.getItem('userInfo') ? (
              <ProfilePage />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
          <Route exact path='/shipping' component={ShippingPage} />
          <Route exact path='/payment' component={PaymentMethodPage} />
          <Route exact path='/place-order' component={PlaceOrderPage} />
          <Route exact path='/order/:id' component={OrderDetail} />
        </Container>
      </main>
      <Footer />
      <BackToTop />
    </Router>
  );
}

export default App;
