import './App.scss';
import NavBar from './Layout/NavBar'
import Board from './Layout/Board';
import BoardColumn from './Layout/BoardColumn';
function App() {
  return (
    <div className="container-fluid ">
   
      <NavBar />
      <Board />
      <BoardColumn />
    
    </div>
  );
}

export default App;
