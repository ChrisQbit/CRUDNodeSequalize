var bcrypt = require('bcrypt');
const http = require('http');
const express = require('express');
var{ Sequelize } = require('sequelize');
const hostname = '127.0.0.1';
const port = 3000;
const path = require('path');
const fileLoginPath = path.resolve(__dirname, 'index.html');
const fileRegisterPath = path.resolve(__dirname, 'register.html');
const fileProductsPath = path.resolve(__dirname, 'products.html');
const filehomePath = path.resolve(__dirname, 'home.html');
const fs = require("node:fs")
const cors = require("cors");
const app = express();
const db = require('./models')
const User = db.users
const Products = db.products
const jwt = require('jsonwebtoken');
var corsOptions = {
  origin: "http://127.0.0.1:3000/"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
var cachedTokenServer = ""

const sequelize = new Sequelize('laravel', 'root', '', {
    host: hostname,
    port: 3307,
    dialect: 'mysql'
  });
var server = http.createServer(app);

//URL Vistas Genericas
app.get("/productos", async (req, res) => {
    const html = fs.readFileSync(fileProductsPath,"utf-8");  
      res.statusCode = 200;
    res.writeHead(200,{"Content-Type": "text/html"});
    res.end(html);
})

app.get("/login_form", async (req, res) => {
  const html = fs.readFileSync(fileLoginPath,"utf-8");  
res.statusCode = 200;
res.writeHead(200,{"Content-Type": "text/html"});
res.end(html);
})

app.get("/register_form", async (req, res) => {
  const html = fs.readFileSync(fileRegisterPath,"utf-8");  
res.statusCode = 200;
res.writeHead(200,{"Content-Type": "text/html"});
res.end(html);
})


app.get("/home", async (req, res) => {
  const html = fs.readFileSync(filehomePath,"utf-8");
  res.statusCode = 200;
  res.writeHead(200,{"Content-Type": "text/html"});
  res.end(html);
})

//API LOGIN REGISTER
app.post("/register", async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
      encryptedPassword = await bcrypt.hash(password, 10);
      const oldUser = await User.findOne({where: { email: email } });
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      let user = await User.create({
        name: first_name + ' ' + last_name,
        remember_token : '',
        email: email.toLowerCase(), 
        password: encryptedPassword,
      });
      const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
      user.set({
        remember_token: token
      });
      user.save()
      cachedTokenServer = token
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });
  // El LOGEO 
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const user = await User.findOne({where: { email: email } });
      if (!user) {
        return res.status(409).send("User doesnt exist. Please Login");
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        user.set({
          remember_token: token
        });
        user.save()
        user.token = token;
        cachedTokenServer = token
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });


  // CRUD SHOW 
  app.post("/Products", async (req, res) => {
    try {
      const { token ,email, password} = req.body;
      if (!(token)) {
        res.status(400).send("All token is required");
      }
      const user = await User.findOne({where: { email: email } });
      if (user.remember_token == token) {
        const prods = await Products.findAll();
        if (!prods) {
          return res.status(409).send("No exixten articulos aun.");
        }
        res.status(200).json(prods);
      }else{
        res.status(400).send("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
  });


    // CRUD DELETE
    app.post("/delete", async (req, res) => {
      try {
        const { token ,email, id} = req.body;
        if (!(token)) {
          res.status(400).send("All token is required");
        }
        const user = await User.findOne({where: { email: email } });
        if (user.remember_token == token) {

          await Products.destroy({
            where: {
              id: id
            },
          });
          res.status(200).json('Borrado');
        }else{
          res.status(400).send("Invalid Credentials");
        }
      } catch (err) {
        console.log(err);
      }
    });
 
        // CRUD CREATE
        app.post("/create", async (req, res) => {
          try {
            const { token ,email, name,detail,price,image} = req.body;
            if (!(token)) {
              res.status(400).send("All token is required");
            }
            const user = await User.findOne({where: { email: email } });
            if (user.remember_token == token) {
              let prod = await Products.create({
                name: name,
                detail : detail,
                price: price, 
                image: image,
              });
              res.status(200).json(prod);
            }else{
              res.status(400).send("Invalid Credentials");
            }
          } catch (err) {
            console.log(err);
          }
        });


          // CRUD EDIT
          app.post("/edit", async (req, res) => {
            try {
              const { token ,email, name,detail,price,image,id} = req.body;
              if (!(token)) {
                res.status(400).send("All token is required");
              }
              const user = await User.findOne({where: { email: email } });
              if (user.remember_token == token) {
                let prod =  await Products.update({ name: name,detail:detail,price:price,image:image }, {
                  where: {
                    id: id,
                  },
                });
                res.status(200).json(prod);
              }else{
                res.status(400).send("Invalid Credentials");
              }
            } catch (err) {
              console.log(err);
            }
          });

          // Cerrar sesion
          app.get("/close", async (req, res) => {
            res.redirect('http://127.0.0.1:3000/login_form');
          });




server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});