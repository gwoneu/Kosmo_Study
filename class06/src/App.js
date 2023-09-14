import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './Home'
import Chat from './Chat'
import Video from './Video'
import Product from './Product'

function VideoHome() {
  return (
    <>
      <p>비디오 홈</p>
    </>
  );
}

function VideoList() {
  return (
    <p>비디오 리스트 : </p>
  );
}

function ChatHome() {
  return (
    <>
      <p>채팅 홈</p>
    </>
  );
}

function ChatList() {
  return (
    <p>ChatList</p>
  )
}

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
          <Route path="/chat" element={<Chat/>}>
            <Route index element={<ChatHome/>}/>
            <Route path="clist" element={<ChatList/>}/>
          </Route>
          <Route path="/video" element={<Video/>}>
            <Route index element={<VideoHome/>}/>
            <Route path="list" element={<VideoList/>}/>
          </Route>
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
                <Link to={`/video/product/${product.id}`}>{product.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Router>
    </div>
  );
}
export default App;