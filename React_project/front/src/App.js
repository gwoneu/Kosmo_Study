import './App.css';
import HeaderPage from './components/shop/HeaderPage';
import { Container } from 'react-bootstrap';
import RouterPage from './components/shop/RouterPage';
import { useState } from 'react';
import { BoxContext } from './components/shop/BoxContext';
import BoxModal from './components/shop/BoxModal';

// 함수형 컴포넌트 (화살표)
const App = () => {
    const background="/images/header_01.png";

    const [box, setBox] = useState({
        show:false,
        message:'',
        action:null
    });

    return (
        <BoxContext.Provider value={{box, setBox}}>
            <Container>
                <HeaderPage/>
                <div>
                    <img src={background} width="100%"/>  
                </div>
                <RouterPage/>
                {box.show && <BoxModal/>}
            </Container>
        </BoxContext.Provider>
    );
} 

export default App;
