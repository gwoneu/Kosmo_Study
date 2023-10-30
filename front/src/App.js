import './App.css';
import HeaderPage from './components/shop/HeaderPage';
import { Container } from 'react-bootstrap';
import RouterPage from './components/shop/RouterPage';

// 함수형 컴포넌트 (화살표)
const App = () => {
    const background="/images/header_01.png";

    return (
        <Container>
            <HeaderPage/>
            <div>
                <img src={background} width="100%"/>
            </div>
            <RouterPage/>
        </Container>
    );
} 

export default App;
