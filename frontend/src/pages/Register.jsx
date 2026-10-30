import { registerUser } from "../api/users"

function Register() {

    const handleSubmit = async (e) => {
       e.preventDefault()

        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const response = await registerUser(user)
        console.log(response)
    }

    return (
        <>
            <h1>Register</h1>
            <div className="login_register">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input type="text" id="username" />
                    </div>
                    <div className="field">
                        <input type="password" id="password" />
                    </div>

                    <button>Registrarse</button>
                </form>
            </div>
        </>
    )
}

export default Register