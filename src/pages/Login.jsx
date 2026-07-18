import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bot, Mail, Lock } from "lucide-react";
import { signIn } from "../services/authService";
import { signInWithGoogle } from "../services/authService";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = async (e) => {
  e.preventDefault();

  const { error } = await signIn(email, password);

  if (error) {
    alert(error.message);
    return;
  }

  navigate("/dashboard");
};
const handleGoogleLogin = async () => {
  const { error } = await signInWithGoogle();

  if (error) {
    alert(error.message);
  }
};


  // Get all registered users
//   const users = JSON.parse(
//     localStorage.getItem("bizbrain_users") || "[]"
//   );

//   if (users.length === 0) {
//     alert("No account found. Please register first.");
//     return;
//   }

//   // Find matching user
//   const foundUser = users.find(
//     (user) =>
//       user.email === email &&
//       user.password === password
//   );

//   if (!foundUser) {
//     alert("Invalid email or password.");
//     return;
//   }

//   // Save currently logged-in user
//   localStorage.setItem(
//     "bizbrain_user",
//     JSON.stringify(foundUser)
//   );

//   // Login
//   localStorage.setItem(
//     "bizbrain_loggedIn",
//     "true"
//   );

//   navigate("/dashboard");
// };

  return (

    <div className="min-h-screen bg-slate-950 text-white grid lg:grid-cols-2">

      {/* Left Side */}

      <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-blue-700 via-cyan-600 to-blue-500">

        <div className="flex items-center gap-4">

          <Bot size={60} />

          <h1 className="text-5xl font-black">

            BizBrain AI

          </h1>

        </div>

        <h2 className="text-5xl font-black mt-12 leading-tight">

          Welcome Back.

        </h2>

        <p className="text-2xl mt-8 text-blue-100 leading-10">

          Continue managing inventory,

          invoices, analytics and AI

          business insights from one place.

        </p>

      </div>

      {/* Right Side */}

      <div className="flex justify-center items-center p-10">

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-slate-900 rounded-3xl p-10 border border-slate-800 shadow-xl"
        >

          <h2 className="text-4xl font-black">

            Login

          </h2>

          <p className="text-slate-400 mt-3">

            Sign in to your account.

          </p>

          {/* Email */}

          <div className="mt-10">

            <label className="block mb-3">

              Email

            </label>

            <div className="flex items-center bg-slate-800 rounded-xl px-4">

              <Mail size={20} className="text-slate-400" />

              <input
                type="email"
                className="bg-transparent flex-1 p-4 outline-none"
                placeholder="Enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />

            </div>

          </div>

          {/* Password */}

          <div className="mt-6">

            <label className="block mb-3">

              Password

            </label>

            <div className="flex items-center bg-slate-800 rounded-xl px-4">

              <Lock size={20} className="text-slate-400"/>

              <input
                type="password"
                className="bg-transparent flex-1 p-4 outline-none"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

            </div>

          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-4 mt-10 font-bold text-lg"
          >

            Login

          </button>
<div className="my-6 flex items-center">
  <div className="flex-1 h-px bg-slate-700"></div>
  <span className="px-4 text-slate-400 text-sm">OR</span>
  <div className="flex-1 h-px bg-slate-700"></div>
</div>

<button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full border border-slate-700 rounded-xl py-4 hover:bg-slate-800 font-semibold"
>
  Continue with Google
</button>
          <p className="text-center mt-8 text-slate-400">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-400 ml-2"
            >

              Register

            </Link>

          </p>

        </form>

      </div>

    </div>

  );
}