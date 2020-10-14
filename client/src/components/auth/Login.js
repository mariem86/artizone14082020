import React, { useState,useEffect } from "react";

import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "../../js/action/authActions";

const Login = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 


  const handleFormChange = (e) =>{
  e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  const handleConfim = (e) => {
    e.preventDefault();
    dispatch(login(formData));
   }
  
  useEffect(() => {
   
    if (isAuth){
    history.push("/dashboard")}
  })



  return (
<div className="login-form">
    <form >
        <h2 className="text-center">Log in</h2>       
        <div className="form-group">
            <input type="email" name="email" className="form-control" placeholder="Email" required="required"
            onChange={handleFormChange}/>
        </div>
        <div className="form-group">
            <input type="password" name="password" className="form-control" placeholder="Password" required="required"
            onChange={handleFormChange}/>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block" onClick={handleConfim}>Log in</button>
        </div>
        </form>
  
</div>

  );
};

export default Login;