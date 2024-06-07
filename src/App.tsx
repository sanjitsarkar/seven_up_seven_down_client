import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Game from "./components/Game";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Game />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
