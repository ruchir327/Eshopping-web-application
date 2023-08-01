import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";
import { updateProfile } from "firebase/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";
const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    const [displayName, setdisplayName] = useState("");
  
    //usestate hook to define password and setpassword variables
    //password value will be stored in password variable and setpassword is used to set its value to set to password variable
    const [password, setPassword] = useState("");
    let dispatch = useDispatch();
    const navigate = useNavigate();
  //usestate handle to load the user email from local storage and set it as the email value using setemail variaable 
    useEffect(() => {
      setEmail(window.localStorage.getItem("emailForRegistration"));
    }, []);
    useEffect(() => {
        setdisplayName(window.localStorage.getItem("nameForRegistration"));
      }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // validation
        if (!email || !password) {
          toast("Email and password is required");
          return;
        }
    
        if (password.length < 6) {
          toast("Password must be at least 6 characters long");
          return;
        }
    //auth.signInWithEmailLink method is called with two parameters and stored in result object:
//email: The user's email address used for registration.
//window.location.href: The current URL of the web page, which contains the verification link.
        try {
            setLoading(true);
          const result = await auth.signInWithEmailLink(
           
            email,
            window.location.href
          );
          //   console.log("RESULT", result);
          if (result.user.emailVerified) {
            // remove user email fom local storage
            window.localStorage.removeItem("emailForRegistration");
            // get user id token for jsonwebtoken to communicate with backend
            let user = auth.currentUser;
            await updateProfile(user, {
                displayName: displayName,
              });
        
            await user.updatePassword(password);
            
            const idTokenResult = await user.getIdTokenResult();
            // redux store
            // console.log("user", user, "idTokenResult", idTokenResult);
            toast("Registration successful");
            setLoading(false);
            // redirect
            createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch();
          navigate("/dashboard");
          }
        } catch (error) {
          console.log(error);
          toast(error.message);
        }
      };
    
  // const completeRegistrationForm = () => (
  //    //added password field to set the user password
  //   <form onSubmit={handleSubmit} className="register-form">
  //     <div className="form-group">
   
  //       <input
  //         type="email"
  //         className="form-control"
  //         value={email}
  //         placeholder="Enter your email"
  //         onChange={(e) => setEmail(e.target.value)}
  //         autoFocus
  //       />
  //    <br/>
  //    <div className="form-group">
  //       <input
  //         type="name"
  //         className="form-control"
  //         value={displayName}
  //         placeholder="Enter your name"
  //         onChange={(e) => setdisplayName(e.target.value)}
  //       />
  //     </div>
  //     {/* <div className="form-group"> */}
  //       <input
  //         type="password"
  //         className="form-control"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         placeholder="Password"
  //       />
  //     {/* </div> */}
  //     {/* <div className="form-group text-center"> */}
  //     <br/>
  //     <Button
  //       onClick={handleSubmit}
  //       type="primary"
  //       className="mb-3"
  //       block
  //       shape="square"
  //       size="large"
  //       disabled={!email || loading}
  //     >
  //        {loading ? <SyncOutlined spin /> : "Submit"}
  //     </Button>
  //     </div>
  //   </form>
  // );
//container-fluid-full width layout
//row justify-content-center align-items-center - center the content both horizontally and vertically within the row
  // return (
  //   <div className="container-fluid p-5">
  //     <div className="row justify-content-center align-items-center">
  //       <div className="col-md-6">
  //         <h4 className="text-center" >Register</h4>
  //        <br/>
  //         <div>
  //           {completeRegistrationForm()}
  //         </div>
  //       </div>
  //     </div>
  //    </div>
  // );
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
                value={displayName}
                onChange={(e) => setdisplayName(e.target.value)}
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
    )
};

export default RegisterComplete;
