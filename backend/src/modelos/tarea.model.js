import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true

    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }


}, {
    timestamps: true
});

export default mongoose.model('Tarea', tareaSchema);