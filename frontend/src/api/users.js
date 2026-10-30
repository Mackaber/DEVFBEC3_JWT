import axios from "axios"

const ENDPOINT = "http://localhost:3000"

const registerUser = async ({ username, password }) => {
    return await axios.post(`${ENDPOINT}/register`, { username, password })
}

export { registerUser }