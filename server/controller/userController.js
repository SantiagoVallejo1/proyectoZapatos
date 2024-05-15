const fs = require('fs').promises;
const { register } = require('module');
const path = require('path');

const userFilePath = path.join(__dirname,'../../src/components/usuariosRegistrados.json')

const controller ={
    register: async function(req, res){
        try{

            const userData = await fs.readFile(userFilePath, "utf-8");
            const users = JSON.parse(userData);
            
            const ultimo = users.length;
            const usuarioNuevo = {
                id: ultimo + 1,
                identificacion: req.body.identificacion,
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                email: req.body.email,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                fechaNacimiento: req.body.fechaNacimiento,
                password: req.body.password,
                estado: "Activo",
                rol: "Usuario",
                fechaCreacion: new Date()
            };

            for(x of users){
            if(x.email ===req.body.email){
                res.status(400).send("El email ya existe");
                return
            }
        }
        users.push(usuarioNuevo);
        
        await fs.writeFile(userFilePath, JSON.stringify(users,null, 4));
        
        res.status(200).send("Exito");
        } catch (error){
            console.error("Error al procesar el registro:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    login: async function (req, res){
        try{
            const userData = await fs.readFile(userFilePath, "utf-8");
            const users = JSON.parse(userData);

            for(x of users){
                if(
                    x.email === req.body.email &&
                    x.password === req.body.password &&
                    x.rol === req.body.rol 
                ){
                    return res.json({
                        nombres : x.nombres,
                        apellidos : x.apellidos,
                        email : x.email,
                    });
                }
            }
            res.status(400).send("Error");
        } catch (Error){
            console.error("Error al procesar el registro:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
};

module.exports = controller;