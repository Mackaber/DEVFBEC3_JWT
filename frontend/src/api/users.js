import axios from "axios"

const ENDPOINT = "http://localhost:3000"

// Funcion helper para extraer errores del servidor
const getErrorData = (error) => ({
    errors: {},
    message: 'No se pudo conectar con el servidor',
    ...error?.response?.data,
    failed: true
});


const registerUser = async ({ username, password }) => {
    try {
        const response = await axios.post(`${ENDPOINT}/register`, { username, password })
        return response.data
    } catch(error) {
        return getErrorData(error)
    }
}

const logUser = async ({ username, password }) => {
    try {
        const response = await axios.post(`${ENDPOINT}/login`, { username, password })
        return response.data
    } catch(error) {
        return getErrorData(error)
    }
}

export { registerUser, logUser }