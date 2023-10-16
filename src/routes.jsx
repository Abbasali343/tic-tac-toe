import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Selection from "./components/SelectionPage";
import Game from "./components/Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/selection",
    element: <Selection />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

export default router;
