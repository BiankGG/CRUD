const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
  { id: 1, name: "Ryu", age: 43, origin: "Japan" },
  { id: 2, name: "Chun-Li", age: 39, origin: "China" },
  { id: 3, name: "Ken-Master", age: 42, origin: "USA" },
  { id: 4, name: "Guile", age: 47, origin: "USA" },
  { id: 5, name: "Blanka", age: 41, origin: "Brazil" },
  { id: 6, name: "Sagat", age: 22, origin: "Thailand" },
  { id: 7, name: "Balrog", age: 22, origin: "USA" },
  { id: 8, name: "Cammy", age: 33, origin: "England" },
  { id: 9, name: "Lily", age: 16, origin: "Mexico" },
  { id: 9, name: "Dhalsim", age: 55, origin: "India" },
  { id: 10, name: "Jamie-KungFu", age: 21, origin: "japan" },
  { id: 11, name: "Luke", age: 23, origin: "USA" },
  { id: 12, name: "E.Honda", age: 47, origin: "Japan" },
  { id: 13, name: "Zangief", age: 51, origin: "Russia" },
  { id: 14, name: "Dee-Jay", age: 42, origin: "Jamaica" },
  { id: 15, name: "lee", age: 56, origin: "China" },
];

//read
app.get("/", (req, res) => {
  res.send(`
    <h1>Street Fighter Characters</h1>
    <ul>
    ${usuarios
      .map(
        (usuario) =>
          `<li>Name:${usuario.name} | Age:${usuario.age} | Origin:${usuario.origin}</li>`
      )
      .join("")}
    </ul>

    <form action= "/usuarios" method= "post">
    <label for "name">Name:<label>
    <input type = "text" id= "name" name= "name" required>
    <label for "age">Age:<label>
    <input type = "text" id= "age" name= "age" required>
    <label for "origin">Origin:<label>
    <input type = "text" id = "origin" name= "origin" required>
    <button type="submit">Add user info</button>
    </form>
    <a href= "/usuarios" > Json Users</a>
    
    
    
    `);
});

//create
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});
//comodin :nombre, :id
app.get("/usuarios/:name", (req, res) => {
  const nameId = req.params.name;
  const userFind = usuarios.find((usuario) => usuario.name === nameId);
  if (userFind) {
    res.json(userFind);
  } else {
    res.status(200).send("character not found");
  }
});

app.post("/usuarios", (req, res) => {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    name: req.body.name,
    age: req.body.age,
    origin: req.body.origin,
  };
  usuarios.push(nuevoUsuario);
  res.redirect("/");
});

app.listen(3000, (req, res) => {
  console.log("Server on...");
});
