const express = require('express');
const app = express();
require('dotenv').config({ path: '.env.local' });
const cors = require('cors');

//Middleware
app.use(express.json());
app.use(cors());

// obtener las credenciales para .env
const PORT = process.env.PORT;

//ruta de APIs
app.use('/api/users', require('./routers/usersRouter.js'));
app.use('/api/commitAnalyses', require('./routers/commit_analysesRouter.js'));

//Listen en el puerto 3001
app.listen(PORT, () => {
    console.log('Puerto escuchandose en la zona: ', PORT);
})