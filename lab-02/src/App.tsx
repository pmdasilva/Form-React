import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAuthenticated = Boolean(user);
  const userRole = user?.role || "user";

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home'
          element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
            <Home />
          </ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
