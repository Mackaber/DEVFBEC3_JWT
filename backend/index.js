const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const fs = require('fs')
dotenv.config()

// Configuracion
const server = express()
const PORT = 3000
const JWTSECRET = process.env.JWTSECRET

// Middleware
server.use(cors())
server.use(express.json())

let db = [];

server.post('/register', (req, res) => {
    const { username, password } = req.body
    //const username = req.body.username
    //const password = req.body.password

    const hashedPassword = bcrypt.hashSync(password, 10)
    db.push({ username, password: hashedPassword })
    fs.writeFileSync('db.json', JSON.stringify(db), 'utf-8')

    //res.status(201).json({
    //    message: "Usuario registrado exitosamente"
    //})

    res.status(400).json({
        message: "error y es tu culpa jejeje"
    })
})

server.post('/login', (req, res) => {
    const { username, password } = req.body

    const file =  fs.readFileSync('db.json', 'utf-8')
    db = JSON.parse(file)

    const user = db.find((user) => user.username == username)
    const token = jwt.sign( { username: user.username, admin: false } , JWTSECRET, { expiresIn: '1w'})

    bcrypt.compare(password, user?.password, (err, result) => {
        if (result) {
            res.status(200).json({
                message: "Inicio de sesión exitoso",
                token: token
            })
        } else {
            res.status(401).json({
                message: "Usuario o contraseña inválidos"
            })
        }
    })

})

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
    const file =  fs.readFileSync('db.json', 'utf-8')
    db = JSON.parse(file)
})