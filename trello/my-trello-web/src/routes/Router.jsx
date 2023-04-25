import Boardpage from "../pages/Boardpage";
import Login from "../pages/Login";

const publicRoutes = [{ path: "/", component: Login }];
const privateRoutes = [{ path: "/home/*", component: Boardpage }];
export { publicRoutes,privateRoutes };
