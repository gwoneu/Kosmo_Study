import './App.css';
import Cart from './Cart'
import Timer from './Timer'
import Page from './Page'

function App() {
  const data = [
    {id:1, text:'Hu'},
    {id:2, text:'He'},
    {id:3, text:'Ho'},
  ]
  const page = 1;
  return (
    <div>
      <Cart/>
      <Timer/>
      <Page data={data} itemsPerPage={page}/>
    </div>
  );
}

export default App;
