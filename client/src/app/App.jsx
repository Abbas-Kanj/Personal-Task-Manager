import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth/index";
import store from "./store";
import { Provider } from "react-redux";
import Board from "../pages/Board";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
