import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import "../pages/Account.css";
import { updateAccount } from "../features/services/fakeAuthService";

const Account = () => {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (username.length < 5) return setMessage("❌ Username must be at least 5 characters.");
    if (password.length < 8) return setMessage("❌ Password must be at least 8 characters.");

    try {
      const updated = await updateAccount({ username, password });
      setUser(updated);
      setMessage("✅ Account updated successfully.");
    } catch (err) {
      setMessage("❌ Failed to update account.");
    }
  };

  const handleCancel = () => {
    setUsername(user?.username || "");
    setPassword("");
    setMessage("Changes discarded.");
  };

  return (
    <div className="account-container">
      <h1>🧑‍💼 Manage Account</h1>
      <p className="intro-text">Do you want to change your password?</p>
      {message && <p className="status-text">{message}</p>}

      <div className="form-group">
        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </div>

      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="account-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Account;
