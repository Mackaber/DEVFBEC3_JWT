import { useState } from 'react'
import { logUser } from "../api/users"
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

function Login() {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema)
    })

    const [message, setMessage] = useState('')

    const handleSubmitManual = async (e) => {
       e.preventDefault()

        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const response = await logUser(user)
        console.log(response)
    }

    const onSubmit = async (data) => {
        setMessage('')
        clearErrors()

        const response = await logUser(data)


        if(response.errors?.username) {
            setError('username', {
                type: 'server',
                message: response.errors.username
            })
        }

        if(response.errors?.password) {
            setError('password', {
                type: 'server',
                message: response.errors.password
            })
        }

        if(response.failed) {
            setError('root.server', {
                type: 'server',
                message: response.message
            })
            return
        }

        setMessage(response.message ?? 'Usuario logueado exitosamente')
    }

    return (
        <>
            <h1>Login</h1>
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

                    {errors.root?.server && <p className="errors">{errors.root.server.message}</p>}
                    <button>Iniciar sesión</button>
                </form>
            </div>
            {message && <p className='success'>{message}</p>}
        </>
    )
}

export default Login