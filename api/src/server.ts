import express from 'express';
import cors from 'cors';
import router from './routes/calcRoutes';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

// CORS - COMUNICACAO ENTRE O FRONT E O BACKEND.
app.use(cors({
  origin: 'http://localhost:4200', // ROTA DO FRONTEND
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());



// VALIDAR SE ESTÁ CONECTANDO AO BANCO. - DEBUG.
connectDB().then(() => {  
  const checkMongoConnection = () => {
    const state = mongoose.connection.readyState;
    switch (state) {
      case 0:
        console.log('-----------------------Desconectado do MongoDB----------------------------');
        break;
      case 1:
        console.log('---------------------------Conectado ao MongoDB--------------------------');
        break;
      case 2:
        console.log('-------------------------Conectando ao MongoDB----------------------------');
        break;
      case 3:
        console.log('---------------------------Desconectando do MongoDB------------------------');
        break;
      default:
        console.log('-------------------------------Estado de conexão desconhecido--------------------');
    }
  };

  checkMongoConnection(); 

  
  app.use('/api', router);
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});
