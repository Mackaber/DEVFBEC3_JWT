const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const { User } = require("./models/User");
dotenv.config();

// Configuracion
const server = express();
const PORT = 3000;
const JWTSECRET = process.env.JWTSECRET;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
server.use(cors());
server.use(express.json());

//let db = [];

async function connectDatabase() {
  if (!MONGODB_URI) {
    console.log('MONGODB_URI no está configurada')
    return
  }

  await mongoose.connect(MONGODB_URI)
  console.log('MongoDB connected')
}

server.post("/register", async (req, res) => {
  const { username, password } = req.body;
  //const username = req.body.username
  //const password = req.body.password

  const hashedPassword = bcrypt.hashSync(password, 10);
  //db.push({ username, password: hashedPassword })
  //fs.writeFileSync('db.json', JSON.stringify(db), 'utf-8')

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        errors: {
          username: "El nombre de usuario ya existe",
        },
      });
    }

    // Registrar al usuario en MongoDB
    const user = new User({ username, password: hashedPassword })
    await user.save()

  } catch (error) {
    console.error("Error al registrar el usuario:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        errors: {
          username: error.errors.username?.message,
          password: error.errors.password?.message,
        },
      });
    }

    return res.status(500).json({
      errors: {
        server: "Error al registrar el usuario",
      },
    });
  }
});

server.post("/login", (req, res) => {
  const { username, password } = req.body;

  //const file =  fs.readFileSync('db.json', 'utf-8')
  //db = JSON.parse(file)

  const user = db.find((user) => user.username == username);
  const token = jwt.sign({ username: user.username, admin: false }, JWTSECRET, {
    expiresIn: "1w",
  });

  bcrypt.compare(password, user?.password, (err, result) => {
    if (result) {
      res.status(200).json({
        message: "Inicio de sesión exitoso",
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Usuario o contraseña inválidos",
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  //const file =  fs.readFileSync('db.json', 'utf-8')
  //db = JSON.parse(file)
  connectDatabase()
});
