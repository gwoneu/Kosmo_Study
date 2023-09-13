import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './Home'
import Chat from './Chat'
import Video from './Video'

function App() {
  return (
    <Router>
      <>
        <Route exact path="/" Component={Home}/>
        <Route path="/chat" Component={Chat}/>
        <Route path="/video" Component={Video}/>
      </>
    </Router>
  );
}

export default App;
