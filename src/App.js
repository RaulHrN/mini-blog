import "./App.css";

import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { AuthProvider } from "./contexts/auth-context";

import { HomePage } from "./pages/home-page/HomePage";
import { AboutPage } from "./pages/about-page/AboutPage";
import { Post } from "./pages/post/Post";

import { Navbar } from "./components/navbar/Navbar.component";
import { Footer } from "./components/footer/Footer.component";
import { CreatePost } from "./pages/create-post/CreatePost";
import { SearchPage } from "./pages/search/Search";
import { LoginPage } from "./pages/login-page/Login";
import { RegisterPage } from "./pages/register-page/Register";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { EditPost } from "./pages/edit-post/EditPost";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route
                path="/login"
                element={!user ? <LoginPage /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/register"
                element={!user ? <RegisterPage /> : <Navigate to="/" />}
              ></Route>
              <Route path="/about" element={<AboutPage />}></Route>
              <Route path="search" element={<SearchPage />}></Route>
              <Route
                path="dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              ></Route>
              <Route path="/posts/:id" element={<Post />}></Route>
              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/posts/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />}
              ></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
