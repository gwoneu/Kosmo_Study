import './App.css';
import { Container } from 'react-bootstrap'
import HeaderPage from './components/HeaderPage';
import FooterPage from './components/FooterPage';

function App() {
  return (
    <div className="App">
      <Container>
        <HeaderPage/>
        <FooterPage/>
      </Container>
    </div>
  );
}

export default App;
