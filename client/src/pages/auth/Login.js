import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate,useLocation} from "react-router-dom";
export default function Login() {
  // state
  const [email, setEmail] = useState("ruchirshrikhande444@gmail.com");
  const [password, setPassword] = useState("MongoDb123$");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  // hook
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/login`, {
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Login successful");
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Try again.");
    }
  };

  return (
    <div>
      <Jumbotron title="Login" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            <Button
              onClick={handleSubmit}
              type="primary"
              className="mb-3"
              block
              shape="square"
              size="large"
              disabled={!email || loading}
             >
            {loading ? <SyncOutlined spin /> : "Submit"}
            </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { auth, googleAuthProvider } from "../../firebase";
// import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
// import { Button } from "antd";
// import {
//   MailOutlined,
//   GoogleCircleFilled,
//   SyncOutlined,
//   FacebookOutlined,
// } from "@ant-design/icons";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const createOrUpdateUser = async (authtoken) => {
//   return await axios.post(
//     `${process.env.REACT_APP_API}/create-or-update-user`,
//     {},
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );
// };

// const Login = ({ history }) => {
//   const [email, setEmail] = useState("ruchir.shrikhande555@gmail.com");
//   const [password, setPassword] = useState("MongoDb123$");
//   const [loading, setLoading] = useState(false);
//   let dispatch = useDispatch();
//   const { user } = useSelector((state) => ({ ...state }));

//   useEffect(() => {
//     if (user && user.token) history.push("/");
//   }, [user]);

//   const roleBasedRedirect = (res) => {
//     if (res.data.role === "admin") {
//       history.push("/admin/dashboard");
//     } else {
//       history.push("/user/history");
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const result = await auth.signInWithEmailAndPassword(email, password);
//       const { user } = result;
//       const idTokenResult = await user.getIdTokenResult();
//       createOrUpdateUser(idTokenResult.token)
//         .then((res) => {
//           dispatch({
//             type: "LOGGED_IN_USER",
//             payload: {
//               name: res.data.name,
//               email: res.data.email,
//               token: idTokenResult.token,
//               role: res.data.role,
//               _id: res.data._id,
//             },
//           });
//           roleBasedRedirect(res);

//         })
//         .catch();
//     } catch (error) {
//       console.log(error);
//       toast(error.message);
//       setLoading(false);
//     }
//   };

//   const facebookLogin = async () => {
//     const provider = new FacebookAuthProvider();
//     signInWithPopup(auth, provider)
//       .then((re) => {
//         console.log(re);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };

//   const googleLogin = async () => {
//     auth
//       .signInWithPopup(googleAuthProvider)
//       .then(async (result) => {
//         const { user } = result;
//         const idTokenResult = await user.getIdTokenResult();
//         createOrUpdateUser(idTokenResult.token)
//           .then((res) => {
//             dispatch({
//               type: "LOGGED_IN_USER",
//               payload: {
//                 name: res.data.name,
//                 email: res.data.email,
//                 token: idTokenResult.token,
//                 role: res.data.role,
//                 _id: res.data._id,
//               },
//             });
//             roleBasedRedirect(res);

//           })
//           .catch();
//         history.push("/");
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error(err.message);
//       });
//   };

//   const loginForm = () => (
//     <form onSubmit={handleSubmit} className="login-form">
//       <div className="form-group">
//         <input
//           type="email"
//           className="form-control"
//           value={email}
//           placeholder="Enter your email"
//           onChange={(e) => setEmail(e.target.value)}
//           autoFocus
//         />
//       </div>

//       <div className="form-group mb-3">
//         <input
//           type="password"
//           className=" mb-3 form-control"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//       </div>

//       <div className="form-group text-center">
//         <Button
//           onClick={handleSubmit}
//           type="primary"
//           className="mb-3"
//           block
//           shape="square"
//           icon={<MailOutlined />}
//           size="large"
//           disabled={!email || password.length < 6}
//         >
//           {loading ? <SyncOutlined spin /> : "Login with Email/Password"}
//         </Button>
//       </div>
//     </form>
//   );

//   return (
//     <div className="container-fluid p-5">
//       <div className="row justify-content-center align-items-center">
//         <div className="col-md-6">
//           <h4 className="text-center">Login</h4>
//           <div>
//             {loginForm()}
//             <Button
//               onClick={googleLogin}
//               type="danger"
//               className="mb-3 google-btn"
//               block
//               shape="square"
//               icon={<GoogleCircleFilled />}
//               size="large"
//             >
//               Continue with Google
//             </Button>

//             <Button
//               onClick={facebookLogin}
//               type="primary"
//               className="mb-4 mt-3 facebook-btn"
//               block
//               shape="square"
//               icon={<FacebookOutlined />}
//               size="large"
//             >
//               Continue with Facebook
//             </Button>

//             <div className="text-center">
//               <Link to="/forgot/password" className="text-danger">
//                 Forgot Password?
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
