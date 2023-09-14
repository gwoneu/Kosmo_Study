import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './Home'
import Chat from './Chat'
import Video from './Video'

function App() {
  return (
    <div>
      <Router>
        {/* 라우트 설정 */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/video" element={<Video/>}/>
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
      </Router>
    </div>
  );
}
export default App;