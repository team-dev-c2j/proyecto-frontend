import "../../styles/login-register.css"
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import Users from "../adminComponentes/users/Users"

function Register () {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signup, errors: registerErrors } = useAuth()

    const onSubmit = handleSubmit (async (values) => {
        signup(values)
        alert('user creado')
    })

    return (
        <div className="login">
                    <h2>Register</h2>
                    {
                registerErrors.map((error, i) => (
                    <div className="error" key={i}>
                        {error}
                    </div>
                ))
                }
                <form onSubmit={onSubmit}>
            <div>
                <label for="user">User</label><br/>
                <input type="text"  {...register("username", {required: true})}  />
                {errors.username && (<p className="error" >Email is required</p>)}
            </div>
            <div>
                <label for="password">Password</label><br/>
                <input type="password" {...register("password", {required: true})}  />
                {errors.password && (<p className="error" >Password is required</p>)}
            </div>
            <button type="submit" class="btn btn-outline-info">Registrar</button>
                </form>
            <Users></Users>
        </div>

    )
}

export default Register;