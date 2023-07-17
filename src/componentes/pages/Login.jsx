import "../../styles/login.css"

function Login () {
    return (
        <div className="login">
                    <h2>login</h2>
            <div>
                <label for="user">User</label><br/>
                <input type="text"  name="user" required />
            </div>
            <div>
                <label for="password">Password</label><br/>
                <input type="password" id="size" name="password" required />
            </div>
            <button className="ingresar">Ingresar</button>
        </div>

    )
}

export default Login;