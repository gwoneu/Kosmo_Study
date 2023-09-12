import './App.css';
import Random from './Random';
import Login from './Login';
import List from './List';
import Context from './Context';
import Language from './Language';

function App() {
  return (
    <div>
      <h1>로그인 관련 처리</h1>
      <Login/>
      <h1>리스트 여러개 만들기</h1>
      <List/>
      <h1>자동, 수동 로또 만들기</h1>
      <Random/>
      <h1>콘텍스트 사용해보기</h1>
      <Context/>
      <h1>콘텍스트 언어 전달</h1>
      <Language/>
    </div>
  );
}

export default App;
