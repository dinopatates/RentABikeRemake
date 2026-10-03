import Brand from "./Brand";
import Icon from "./Icon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  const [loggingOut, setLoggingOut] = useState(false);
  const isAdmin = user && [1, "1", "admin"].includes(user.role);

  function navClass(path) {
    return location.pathname === path
      ? "font-bold text-[#ff9e0b]"
      : "text-gray-300 transition-colors hover:text-[#ffb83d]";
  }

  // synchro user au localStorage
  useEffect(() => {
    function syncUser() {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    }

    // écoute les changements du localstorage
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage"
      , syncUser);
  }, []);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json" },
      });
    } finally {
      localStorage.removeItem("user");
      setUser(null);
      setLoggingOut(false);
      navigate("/");
    }
  }

  return (
    <header className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-8 border-b border-gray-800 px-6 text-gray-100">
      <Link to="/" aria-label="Ride Libre accueil"><Brand /></Link>
      <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Main navigation">
        <Link className={navClass("/")} to="/">Home</Link>
        <Link className={navClass("/vehicles")} to="/vehicles">Vehicles</Link>
        <Link className={navClass("/about-us")} to="/about-us">About Us</Link>
        <Link className={navClass("/contact")} to="/contact">Contact Us</Link>
        {isAdmin && <Link className={navClass("/admin/vehicles")} to="/admin/vehicles">Admin</Link>}
      </nav>
      <div className="flex items-center gap-3 text-sm">
        {user ? (
          <>
            <span className="font-bold text-[#ff9e0b]">Hi {user.name}</span>
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#ff9e0b] px-4 py-2 font-bold text-white transition-colors hover:bg-[#ffb83d] disabled:cursor-not-allowed disabled:opacity-80" disabled={loggingOut} onClick={handleLogout} type="button">
              Déconnexion
              {loggingOut && <span aria-label="Déconnexion en cours" className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" role="status" />}
            </button>
          </>
        ) : (
          <>
            <Link className="font-bold hover:text-[#5534e7]" to="/login">Login</Link>
            <Link className="rounded-lg bg-[#ff9e0b] px-4 py-2 font-bold text-white transition-colors hover:bg-[#ffb83d]" to="/register">Register</Link>
          </>
        )}
      </div>
      <a className="hidden items-center gap-3 text-sm md:flex" href="tel:+9962471680">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#5534e7] text-white"><Icon name="phone" size={18} /></span>
        <span><small className="mb-0.5 block text-xs text-gray-500">Need help?</small><strong>+996 247-1680</strong></span>
      </a>
      <button className="text-sm font-bold md:hidden" type="button" aria-label="Open menu">Menu</button>
    </header>
  );
}