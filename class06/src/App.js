import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './Home'
import Chat from './Chat'
import Video from './Video'
import Product from './Product'

function App() {
  const productData = [
    {id: 1, name : '물티슈', price: '₩2,000'}, //1번 페이지에 들어가면 물티슈와 가격이 나옴
    {id: 2, name : '커피', price: '₩2,500'},
    {id: 3, name : '키보드', price: '₩12,000'},
  ];

  return (
    <div>
      <Router>
        {/* 라우트 설정 */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/video" element={<Video/>}/>
          <Route path="/product/:id" element={<Product data={productData}/>}/>
        </Routes>

        <nav>
          <ul style={{listStyle : 'none'}}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/chat'>Chat</Link>
            </li>
            <li>
              <Link to='/video'>Video</Link>
            </li>
          </ul>
        </nav>

        <nav>
          <ul>
            {productData.map((product) => (
              <li key={product.id}>
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Router>
    </div>
  );
}
export default App;