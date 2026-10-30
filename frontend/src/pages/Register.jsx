import { registerUser } from "../api/users"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const userSchema = z.object({
    username: z.string().min(3, {
        message: 'El nombre de usuario debe tener al menos 3 caracteres'
    }),
    password: z.string().min(6, {
         message: 'La contraseña debe tener al menos 6 caracteres'
    })
})

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema)
    })



    const handleSubmitManual = async (e) => {
       e.preventDefault()

        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const response = await registerUser(user)
        console.log(response)
    }

    const onSubmit = async (data) => {
        const response = registerUser(data)
        console.log(response)
    }

    return (
        <>
            <h1>Register</h1>
            <div className="login_register">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label htmlFor="username">Nombre de usuario:</label>
                        <input type="text" id="username" {...register("username") } />
                        {errors.username && <p className="errors">{errors.username.message}</p>}
                    </div>
                    <div className="field">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password"  {...register("password") }/>
                        {errors.password && <p className="errors">{errors.password.message}</p>}
                    </div>

                    <button>Registrarse</button>
                </form>
            </div>
        </>
    )
}

export default Register