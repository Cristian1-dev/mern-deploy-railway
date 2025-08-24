import dotenv from 'dotenv';
dotenv.config();

import { app } from "../src/app.js";
import { connectDB } from "./baseDatos.js";
import { PORT } from "../src/config.js";

connectDB();




app.listen(PORT, () => {
    console.log(`Corriendo en el puerto http://localhost:${PORT}`);

})