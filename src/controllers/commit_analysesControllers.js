const pool = require('../config')

module.exports.getCommitAnalyses = async (req, res) => {

    try {

        const query = `SELECT * FROM commit_analyses ORDER BY analysis_date DESC`

        const result = await pool.query(query)

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "No hay análisis registrados"
            })
        }

        res.status(200).json({
            message: "Análisis obtenidos con éxito",
            data: result.rows
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Error al obtener los análisis"
        })

    }

}

module.exports.getCommitAnalysisById = async (req, res) => {

    try {

        const { id } = req.params

        if(!id){
            return res.status(400).json({
                message: "Debe proporcionar el id del análisis"
            })
        }

        const query = `SELECT * FROM commit_analyses WHERE id = $1`

        const result = await pool.query(query,[id])

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Análisis no encontrado"
            })
        }

        res.status(200).json({
            message: "Análisis encontrado",
            data: result.rows[0]
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Error al obtener el análisis"
        })

    }

}

module.exports.createCommitAnalysis = async (req, res) => {

    try {

        const {
            commit_hash,
            user_id,
            risk_score,
            lines_added,
            lines_deleted,
            files_modified,
            tests_modified,
            complex_sql_added
        } = req.body

        // VALIDACIONES

        if(!commit_hash){
            return res.status(400).json({
                message: "El commit_hash es obligatorio"
            })
        }

        if(commit_hash.length !== 40){
            return res.status(400).json({
                message: "El commit_hash debe tener 40 caracteres"
            })
        }

        if(!user_id){
            return res.status(400).json({
                message: "Debe proporcionar el user_id"
            })
        }

        if(risk_score < 0 || risk_score > 100){
            return res.status(400).json({
                message: "El risk_score debe estar entre 0 y 100"
            })
        }

        const query = `
        INSERT INTO commit_analyses
        (
            commit_hash,
            user_id,
            risk_score,
            lines_added,
            lines_deleted,
            files_modified,
            tests_modified,
            complex_sql_added
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING *
        `

        const values = [
            commit_hash,
            user_id,
            risk_score,
            lines_added || 0,
            lines_deleted || 0,
            files_modified || 0,
            tests_modified || false,
            complex_sql_added || false
        ]

        const result = await pool.query(query, values)

        res.status(201).json({
            message: "Análisis creado con éxito",
            data: result.rows[0]
        })

    } catch (error) {

        if(error.code === '23505'){
            return res.status(409).json({
                message: "Ese commit ya fue analizado"
            })
        }

        if(error.code === '23503'){
            return res.status(400).json({
                message: "El usuario no existe"
            })
        }

        console.error(error)

        res.status(500).json({
            message: "Error al crear el análisis"
        })

    }

}

module.exports.updateCommitAnalysis = async (req, res) => {

    try {

        const { id } = req.params

        const {
            risk_score,
            lines_added,
            lines_deleted,
            files_modified,
            tests_modified,
            complex_sql_added
        } = req.body

        if(!id){
            return res.status(400).json({
                message: "Debe proporcionar el id del análisis"
            })
        }

        if(risk_score !== undefined && (risk_score < 0 || risk_score > 100)){
            return res.status(400).json({
                message: "El risk_score debe estar entre 0 y 100"
            })
        }

        const query = `
        UPDATE commit_analyses
        SET
            risk_score = COALESCE($1, risk_score),
            lines_added = COALESCE($2, lines_added),
            lines_deleted = COALESCE($3, lines_deleted),
            files_modified = COALESCE($4, files_modified),
            tests_modified = COALESCE($5, tests_modified),
            complex_sql_added = COALESCE($6, complex_sql_added)
        WHERE id = $7
        RETURNING *
        `

        const values = [
            risk_score,
            lines_added,
            lines_deleted,
            files_modified,
            tests_modified,
            complex_sql_added,
            id
        ]

        const result = await pool.query(query, values)

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Análisis no encontrado"
            })
        }

        res.status(200).json({
            message: "Análisis actualizado",
            data: result.rows[0]
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Error al actualizar el análisis"
        })

    }

}

module.exports.deleteCommitAnalysis = async (req, res) => {

    try {

        const { id } = req.params

        if(!id){
            return res.status(400).json({
                message: "Debe proporcionar el id"
            })
        }

        const query = `
        DELETE FROM commit_analyses
        WHERE id = $1
        RETURNING *
        `

        const result = await pool.query(query,[id])

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Análisis no encontrado"
            })
        }

        res.status(200).json({
            message: "Análisis eliminado",
            data: result.rows[0]
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Error al eliminar el análisis"
        })

    }

}
