function Login () {
    return (
        <div>
                    <h2>login</h2>
            <div>
                <label for="nameProd">User</label>
                <input type="text" id="nameProd" name="nameProd" required />
            </div>
            <div>
                <label for="size">Password</label>
                <input type="password" id="size" name="size" required />
            </div>
        </div>

    )
}

export default Login;