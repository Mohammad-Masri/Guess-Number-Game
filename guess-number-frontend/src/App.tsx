import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import GamePage from "./pages/GamePage";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<GamePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
