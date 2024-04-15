import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth/index";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
