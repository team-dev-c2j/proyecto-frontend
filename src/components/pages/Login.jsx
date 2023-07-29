import "../../styles/login-register.css"
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

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
                <label for="user">User</label><br/>
                <input type="text"  {...register("username", {required: true})}  />
                {errors.username && (<p className="error" >Username is required</p>)}
            </div>
            <div>
                <label for="password">Password</label><br/>
                <input type="password" {...register("password", {required: true})}  />
                {errors.password && (<p className="error" >Password is required</p>)}
            </div>
            <button type="submit" class="btn btn-outline-info">Ingresar</button>
                </form>

        </div>

    )
}

export default Login;