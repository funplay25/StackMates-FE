import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Signup";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import appStore from "../src/utils/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />}></Route>
              <Route path="signup" element={<SignUp />}></Route>
              <Route path="login" element={<Login />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
