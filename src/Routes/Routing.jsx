import { Route, Routes } from "react-router-dom";
import App from "../App";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </div>
  );
};
export default Routing;
