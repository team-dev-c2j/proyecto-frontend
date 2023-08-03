import React, { useState } from "react";
import "../../styles/login-register.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Users from "../adminComponentes/users/Users";
import { AiFillEyeInvisible  } from "react-icons/ai";

function Register() {
    
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { signup, errors: registerErrors } = useAuth();
  const [userCreated, setUserCreated] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
    alert('user creado');
    reset();
    setUserCreated(true);
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login">
      <h2>Register</h2>
      {registerErrors.map((error, i) => (
        <div className="error" key={i}>
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="user">User</label><br/>
          <input type="text"  {...register("username", { required: true })}  />
          {errors.username && (<p className="error" >Email is required</p>)}
        </div>
        <div>
        <label htmlFor="password">Password</label>
        <br />
        <input className="passwordInput"
          type={showPassword ? 'text' : 'password'} // Cambia el tipo según el estado showPassword
          {...register('password', { required: true })}
        /><AiFillEyeInvisible className="eye" onClick={handleTogglePassword}/>
        {errors.password && <p className="error">Password is required</p>}
      </div>
        <button type="submit" className="btn btn-outline-info">Registrar</button>
      </form>
      <Users userCreated={userCreated} />
    </div>
  );
}

export default Register;
