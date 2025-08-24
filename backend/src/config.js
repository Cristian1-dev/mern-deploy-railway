
console.log(process.env.MONGODB_URI);

export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'some token secret 123';

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/DatosInfo';

export const PORT = process.env.PORT || 3000;