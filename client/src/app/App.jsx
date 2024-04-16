import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Board from "../pages/Board";
import Login from "../pages/Auth/index";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Board" element={<Board />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
