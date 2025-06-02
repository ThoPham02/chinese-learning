import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, LogIn, Search, Bell, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux";
import { ROUTE_PATHS } from "../../common/path";
import UserContainer from "../ui/User";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const navigate = useNavigate();

  const { isLogined, user } = useSelector((state: RootState) => state.auth);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <BookOpen className="w-8 h-8 text-red-600 mr-2" />
            <span className="text-xl font-bold text-gray-800">ChineseViet</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-red-600 transition-colors ${
                isActive("/") ? "text-red-600" : ""
              }`}
            >
              Trang chủ
            </Link>
            <Link
              to="/flashcards"
              className={`text-gray-700 hover:text-red-600 transition-colors ${
                isActive("/flashcards") ? "text-red-600" : ""
              }`}
            >
              Học từ mới
            </Link>

            {isLogined && user.username !== "Admin" &&(
              <>
                {/* <Link
                  to="/review"
                  className={`text-gray-700 hover:text-red-600 transition-colors ${
                    isActive("/review") ? "text-red-600" : ""
                  }`}
                >
                  Ôn tập
                </Link> */}
                <Link
                  to="/quiz"
                  className={`text-gray-700 hover:text-red-600 transition-colors ${
                    isActive("/quiz") ? "text-red-600" : ""
                  }`}
                >
                  Kiểm tra
                </Link>
                <Link
                  to="/progress"
                  className={`text-gray-700 hover:text-red-600 transition-colors ${
                    isActive("/progress") ? "text-red-600" : ""
                  }`}
                >
                  Tiến trình
                </Link>
              </>
            )}

            {isLogined && user.username === "Admin" &&(
              <>
                <Link
                  to="/admin-words"
                  className={`text-gray-700 hover:text-red-600 transition-colors ${
                    isActive("/admin-words") ? "text-red-600" : ""
                  }`}
                >
                  Từ vựng
                </Link>
                <Link
                  to="/admin-quiz"
                  className={`text-gray-700 hover:text-red-600 transition-colors ${
                    isActive("/admin-quiz") ? "text-red-600" : ""
                  }`}
                >
                  Bài kiểm tra
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isLogined ? (
              <>
                <UserContainer />
              </>
            ) : (
              <button
                onClick={() => navigate(`${ROUTE_PATHS.LOGIN}`)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition duration-300 flex items-center"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 absolute top-full left-0 right-0 border-t border-gray-100">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`text-gray-700 hover:text-red-600 transition-colors ${
                isActive("/") ? "text-red-600" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              to="/flashcards"
              className={`text-gray-700 hover:text-red-600 transition-colors ${
                isActive("/flashcards") ? "text-red-600" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Học từ mới
            </Link>
            <Link
              to="/review"
              className={`text-gray-700 hover:text-red-600 transition-colors ${
                isActive("/review") ? "text-red-600" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Ôn tập
            </Link>
            <Link
              to="/quiz"
              className={`text-gray-700 hover:text-red-600 transition-colors ${
                isActive("/quiz") ? "text-red-600" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Kiểm tra
            </Link>
            <Link
              to="/progress"
              className={`text-gray-700 hover:text-red-600 transition-colors ${
                isActive("/progress") ? "text-red-600" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tiến trình
            </Link>
          </nav>
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
              <User className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
