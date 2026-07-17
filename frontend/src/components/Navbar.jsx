import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // Get User
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successfully");

    setMenuOpen(false);

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Desktop + Mobile Header */}

        <div className="flex items-center justify-between">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
              CC
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800">CareerConnect</h1>

              <p className="text-xs text-gray-500">Company & Career Portal</p>
            </div>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/companies"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Companies
            </Link>

            {user && (
              <Link
                to="/my-applications"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                My Applications
              </Link>
            )}
          </div>

          {/* Desktop Right */}

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="font-medium text-blue-600">{user.name}</span>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>

                {/* Admin only when no user login */}

                <Link
                  to="/admin/login"
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black"
                >
                  Admin
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <div className="md:hidden mt-5 flex flex-col gap-4 border-t pt-5">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium"
            >
              Home
            </Link>

            <Link
              to="/companies"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium"
            >
              Companies
            </Link>

            {user && (
              <Link
                to="/my-applications"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium"
              >
                My Applications
              </Link>
            )}
            {/* Mobile Right Side */}

            {user ? (
              <>
                <span className="font-medium text-blue-600">{user.name}</span>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-center border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  Register
                </Link>

                {/* Show Admin only when user is NOT logged in */}

                <Link
                  to="/admin/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-center bg-gray-800 hover:bg-black text-white py-2 rounded-lg"
                >
                  Admin
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
