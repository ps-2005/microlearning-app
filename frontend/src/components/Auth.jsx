import { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function Auth({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      const userCredential = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      console.error("❌ Auth Error:", err.message);
      alert("Authentication failed: " + err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  if (user) {
    return (
      <div className="text-right">
        <p className="text-sm mb-1">Logged in as: {user.email}</p>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-center">
      <input
        type="email"
        placeholder="Email"
        className="p-2 border rounded w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border rounded w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleAuth}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-sm text-blue-500"
      >
        {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
      </button>
    </div>
  );
}

export default Auth;
