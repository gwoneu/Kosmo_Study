import './App.css';
import Random from './Random';
import Login from './Login';
import List from './List';

function App() {
  return (
    <div>
      <h1>로그인 관련 처리</h1>
      <Login/>
      <h1>리스트 여러개 만들기</h1>
      <List/>
      <h1>자동, 수동 로또 만들기</h1>
      <Random/>
    </div>
  );
}

export default App;
