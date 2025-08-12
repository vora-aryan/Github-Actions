import { Route, Routes } from "react-router-dom";
import App from "../Components/Youtube.jsx";

import { lazy, Suspense } from "react";

const About = lazy(() => import("../Components/About"));
const Profile = lazy(() => import("../Components/Profile"));

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          }
        ></Route>
      </Routes>
    </div>
  );
};
export default Routing;
