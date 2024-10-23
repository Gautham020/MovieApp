import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WatchList from "./pages/WatchList";
import Home from "./pages/Home";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Login from "./pages/Login";

function App() {
  const isLoggedIn = !!localStorage.getItem("currentUser");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <div className="flex h-screen">
              <div className="w-64  h-full">
                <Sidebar />
              </div>

              <div className="flex-grow ">
                <div className="fixed w-full ml-64">
                  <Header />
                </div>

                <div className="p-4 mt-16 overflow-y-auto">
                  <Home />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/watchlists"
          element={
            <div className="flex h-screen">
              <div className="w-64 p-3 h-full">
                <Sidebar />
              </div>

              <div className="flex-grow ">
                <div className="fixed w-full ml-64">
                  <Header />
                </div>

                <div className="p-4 mt-16 overflow-y-auto">
                  <WatchList />
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
