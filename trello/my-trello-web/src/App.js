import './App.scss';
import AppBar from './components/Appbar/AppBar';
import Boardbar from './components/Boardbar/Boardbar';
import BoardContent from './components/BoardContent/BoardContent';
function App() {
  return (
    <div className="container-fluid ">   
      <AppBar />
      <Boardbar />
      <BoardContent />
    </div>
  );
}

export default App;
