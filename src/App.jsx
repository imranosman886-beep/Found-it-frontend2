import { useState } from "react";
import Home from "./pages/Home";
import BrowseItems from "./pages/BrowseItems";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [page, setPage] = useState("home");

  const goHome = () => setPage("home");
  const goBrowse = () => setPage("browse");
  const goLogin = () => setPage("login");
  const goSignup = () => setPage("signup");

  switch (page) {
    case "browse":
      return <BrowseItems onHome={goHome} />;

    case "login":
      return <Login onHome={goHome} onSignup={goSignup} />;

    case "signup":
      return <Signup onHome={goHome} onLogin={goLogin} />;

    default:
      return (
        <Home
          onBrowse={goBrowse}
          onLogin={goLogin}
          onSignup={goSignup}
        />
      );
  }
}
