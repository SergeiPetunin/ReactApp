//import logo from './logo.svg';
import './App.css';
//import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      {/* <Container>
        <img src={logo} height="50" width="50" className="d-inline-block align-top" alt="Logo" />
        <h1>
          Hello World!
        </h1>
        <Button variant="primary">Button</Button>
      </Container> */}
      <Header />
      <Footer/>
    </>
  );
}

export default App;
