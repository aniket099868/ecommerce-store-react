import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const [role, setRole] = useState("");

  if (!role) {
    return <Login setRole={setRole} />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            🛒
          </span>
          <div>
            <p className="eyebrow">Online Store</p>
            <h1>Shop with Confidence</h1>
          </div>
        </div>

        <div className="role-badge">Logged in as <strong>{role}</strong></div>
      </header>

      {role === "admin" && (
        <div className="notice">Admin panel access granted.</div>
      )}

      {role === "user" && (
        <div className="notice">Welcome back, shopper.</div>
      )}

      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
