import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Container, Nav, Navbar, NavDropdown,  } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position='top-center' limit={1} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Amazon</Navbar.Brand>
              </LinkContainer>
              <Nav className="ms-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        signOutHandler();
                      }}
                    >
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/signin">
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="my-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
