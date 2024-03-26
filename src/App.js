import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

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
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />}></Route>
              <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />}></Route>
              <Route path="/about" element={<AboutPage/>}></Route>
              <Route path="search" element={<SearchPage />}></Route>
              <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />}></Route>
              <Route path="/posts/:id" element={<Post />}></Route>
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />}></Route>
              <Route path="/posts/edit/:id" element={user ? <EditPost /> : <Navigate to='/login' />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
