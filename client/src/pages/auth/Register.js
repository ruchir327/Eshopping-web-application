import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {SyncOutlined} from "@ant-design/icons"
export default function Register() {
  // state
  const [name, setName] = useState("Ruchir");
  const [email, setEmail] = useState("ruchir.shrikhande555@gmail.com");
  const [password, setPassword] = useState("MongoDb123$");
  const [loading,setloading] = useState(false)
  // hooks
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/register`,
        {
          name,
          email,
          password,
        }
      );
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Registration successful");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Try again.");
    }
  };



  return (
    <div>
      <Jumbotron title="Register" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

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
 {/* <button className="btn btn-primary" type="submit">
                Submit
              </button> */}
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
// import React, { useState,useEffect } from "react";
// import { auth } from "../../firebase";
// import { toast } from "react-toastify";
// import { Button } from "antd";
// import { useSelector } from "react-redux";
// import { SyncOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import Jumbotron from "../../components/cards/Jumbotron";

// import "react-toastify/dist/ReactToastify.css";
// const Register = ({history}) => {
//   const [email, setEmail] = useState("");
//   const { user } = useSelector((state) => ({ ...state }));
//   const [loading, setLoading] = useState(false);
//   const [displayName, setdisplayName] = useState("");
//   useEffect(() => {
//     if (user && user.token) history.push("/");
//   }, [user]);
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     if (!email) {
//       toast("Email is required");
//       return;
//     }
//     const config = {
//       url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
//       handleCodeInApp: true,
//     };
//     setLoading(true);

//     await auth.sendSignInLinkToEmail(email, config);
//     toast(
//       `Email is sent to ${email}. Click the link to complete your registration.`
//     );
//     setLoading(false);
//     // save user email in local storage
//     window.localStorage.setItem("emailForRegistration", email);
//     window.localStorage.setItem("nameForRegistration", displayName);
//     // clear state
//     setEmail("");
//   };

//   // const registerForm = () => (
//   //   <form onSubmit={handleSubmit} className="register-form">
//   //     <div className="form-group">
//   //       <input
//   //         type="email"
//   //         className="form-control"
//   //         value={email}
//   //         placeholder="Enter your email"
//   //         onChange={(e) => setEmail(e.target.value)}
//   //         autoFocus
//   //       />
//   //     </div>
//   //     <div className="form-group">
//   //       <input
//   //         type="name"
//   //         className="form-control"
//   //         value={displayName}
//   //         placeholder="Enter your name"
//   //         onChange={(e) => setdisplayName(e.target.value)}
//   //       />
//   //     </div>
//   //     <div className="form-group text-center style={{ marginTop: '10px' }}">
//   //     <Button
//   //       onClick={handleSubmit}
//   //       type="primary"
//   //       className=" mt-4"
//   //       block
//   //       shape="square"
//   //       size="large"
//   //       disabled={!email || loading}
//   //     >
//   //        {loading ? <SyncOutlined spin /> : "Submit"}
//   //     </Button>
     
//   //     </div>
//   //     <div className="text-center p-3">
//   //         Already registered?{" "}
//   //         <Link to="/login">
//   //           <a>Login</a>
//   //         </Link>
//   //   </div>
//   //   </form>
    
    
//   // );
// //container-fluid-full width layout
// //row justify-content-center align-items-center - center the content both horizontally and vertically within the row
//   // return (
//   //   <div className="container-fluid p-5">
//   //     <div className="row justify-content-center align-items-center">
//   //       <div className="col-md-6">
//   //         <h4 className="text-center" >Register</h4>
         
//   //         <div>
//   //           {registerForm()}
//   //         </div>
//   //       </div>
//   //     </div>
//   //    </div>
//   // );
//     return (
//     <div>
//       <Jumbotron title="Register" />
//       <div className="container mt-5">
//         <div className="row">
//           <div className="col-md-6 offset-md-3">
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 className="form-control mb-4 p-2"
//                 placeholder="Enter your name"
//                 value={displayName}
//                 onChange={(e) => setdisplayName(e.target.value)}
//                 autoFocus
//               />

//               <input
//                 type="email"
//                 className="form-control mb-4 p-2"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               {/* <input
//                 type="password"
//                 className="form-control mb-4 p-2"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               /> */}
//  {/* <button className="btn btn-primary" type="submit">
//                 Submit
//               </button> */}
//             <Button
//               onClick={handleSubmit}
//               type="primary"
//               className="mb-3"
//               block
//               shape="square"
//               size="large"
//               disabled={!email || loading}
//              >
//             {loading ? <SyncOutlined spin /> : "Submit"}
//             </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//     )
// };

// export default Register;

