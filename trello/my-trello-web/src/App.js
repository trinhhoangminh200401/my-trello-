import "./App.scss";
// import AppBar from "./components/Appbar/AppBar";
// import Boardbar from "./components/Boardbar/Boardbar";
// import BoardContent from "./components/BoardContent/BoardContent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/Router";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
