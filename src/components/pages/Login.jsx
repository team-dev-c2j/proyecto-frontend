import "../../styles/login-register.css"
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { AiFillEyeInvisible  } from "react-icons/ai";

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const {signin, errors: signinErrors, isAuthenticated, setUserNav } = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit (async (values) => {
        signin(values)
        setUserNav(values.username)
    })

    useEffect(() => {
        if (isAuthenticated) navigate("/admin")

    },[isAuthenticated, navigate])

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="login">
                    <h2>Login</h2>
                    {
                signinErrors.map((error, i) => (
                    <div className="error" key={i}>
                        {error}
                    </div>
                ))
                }
                <form onSubmit={onSubmit}>
                                <div>
                <label htmlFor="user">User</label><br/>
                <input type="text"  {...register("username", {required: true})}  />
                {errors.username && (<p className="error" >Username is required</p>)}
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
            <button type="submit" className="btn btn-outline-info">Ingresar</button>
                </form>
                
        </div>

    )
}

export default Login;
