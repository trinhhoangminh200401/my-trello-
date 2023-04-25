import { Route, Routes } from "react-router-dom";
import Boardpage from "../pages/Boardpage";
import Login from "../pages/Login";

function Home() {
  return (
    
    <Routes>
      <Route path="" element={<Login />}></Route>
      <Route path="/boardPage/:id" element={<Boardpage />}></Route>
 
    </Routes>
  );
}

export default Home;
