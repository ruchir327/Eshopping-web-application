import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { FaCaretDown, FaTag } from "react-icons/fa";
import toast from "react-hot-toast";
export default function Menu() {
  // hooks
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();
  const categories = useCategory();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("User logged out successfully!")
    navigate("/login");
  };

  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            <i className="fas fa-home"></i> HOME
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/shop">
            <i className="fas fa-shopping-cart"></i> SHOP
          </NavLink>
        </li>
       
        <div className="dropdown">
      <li>
        <a
          className="nav-link pointer dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          Categories
        </a>

        <ul className="dropdown-menu" style={{ height: "300px", overflow: "scroll" }}>
          <li>
            <NavLink className="nav-link" to="/categories">
              <FaTag /> All Categories
            </NavLink>
          </li>

          {categories?.map((c) => (
            <li key={c.slug}>
              <NavLink className="nav-link" to={`/category/${c.slug}`}>
                <FaTag /> {c.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </li>
    </div>
    <li className="nav-item mt-1">
          <Badge
            count={cart?.length >= 1 ? cart.length : 0}
            offset={[-5, 11]}
            showZero={true}
          >
            <NavLink className="nav-link" aria-current="page" to="/cart">
              CART
            </NavLink>
          </Badge>
        </li>
        <Search />

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <i className="fas fa-sign-in-alt"></i> LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                <i className="fas fa-user-plus"></i> REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name}
              </a>

              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                  </NavLink>
                </li>

                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link">
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
}
