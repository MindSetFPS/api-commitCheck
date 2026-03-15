const pool = require('../config.js');
const bcrypt = require('bcrypt');

module.exports.getUsers = async (req, res) => {
    try {
        const query = "SELECT * FROM users"; 
        const result = await pool.query(query);
        if(result.rows.length === 0) {
            res.status(404).json({
                message: 'No se encontraron datos del usuario'
            })
            console.log('No se encontraron datos del usuario');
        } else {
            res.status(201).json({
                message: 'Usuarios obtenido con exito',
                data: result.rows
            })
        }
    } catch (e) {
        console.log("Error al tratar de conectar a la base de datos");
        res.status(500).json({
            message: 'error al tratar de conectar a la base de datos'
        })
    }
}

module.exports.postUsers = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if(!username){
            return res.status(400).json({
                message: 'Ingrese el nombre de usuario'
            });
        }

        if(!email){
            return res.status(400).json({
                message: 'Ingrese el email'
            });
        }
        
        if(!email.includes("@")){
            return res.status(400).json({
                message: "Ingrese un email válido"
            })
        }

        if(!password){
            return res.status(400).json({
                message: 'Ingrese la contraseña'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (username, email, password)
            VALUES ($1,$2,$3)
            RETURNING id, username, email, created_at
        `;

        const values = [username, email, hashedPassword];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: "Usuario creado con éxito",
            data: result.rows[0]
        });

    } catch (error) {

        if(error.code === '23505'){
            return res.status(409).json({
                message: "El username o email ya existe"
            })
        }

        console.error(error);

        res.status(500).json({
            message: 'Error en la base de datos'
        })
    }

}

module.exports.putUser = async (req, res) => {
    try {

        const { id } = req.params
        const { username, email, password } = req.body

        if(!id){
            return res.status(400).json({
                message: "Debe proporcionar el id del usuario"
            })
        }

        let hashedPassword = null

        if(password){
            hashedPassword = await bcrypt.hash(password, 10)
        }

        const query = `
            UPDATE users
            SET 
                username = COALESCE($1, username),
                email = COALESCE($2, email),
                password = COALESCE($3, password)
            WHERE id = $4
            RETURNING id, username, email, created_at
        `

        const values = [username, email, hashedPassword, id]

        const result = await pool.query(query, values)

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        }

        res.status(200).json({
            message: "Usuario actualizado con éxito",
            data: result.rows[0]
        })

    } catch (error) {

        if(error.code === '23505'){
            return res.status(409).json({
                message: "El username o email ya existe"
            })
        }

        console.error(error)

        res.status(500).json({
            message: "Error al actualizar el usuario"
        })
    }
}

module.exports.deleteUser = async (req, res) => {
    try {

        const { id } = req.params

        if(!id){
            return res.status(400).json({
                message: "Debe proporcionar el id del usuario"
            })
        }

        const query = `
            DELETE FROM users
            WHERE id = $1
            RETURNING id, username, email
        `

        const result = await pool.query(query, [id])

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        }

        res.status(200).json({
            message: "Usuario eliminado con éxito",
            data: result.rows[0]
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Error al eliminar el usuario"
        })

    }

}