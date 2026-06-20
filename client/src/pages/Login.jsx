import { useState } from "react";

function Login({ setRole }) {
  const [role, setSelectedRole] = useState("user");

  return (
    <main className="login-page">
      <div className="login-sheet">
        <h1>Welcome Back</h1>
        <p>Select a role to continue.</p>

        <label htmlFor="role" className="sr-only">
          Choose role
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="primary-button" type="button" onClick={() => setRole(role)}>
          Login
        </button>
      </div>
    </main>
  );
}

export default Login;
