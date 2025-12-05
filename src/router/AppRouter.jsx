import { createBrowserRouter } from "react-router";
import App from "../App";
import Projects from "../Projects";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
]);

export default AppRouter;
