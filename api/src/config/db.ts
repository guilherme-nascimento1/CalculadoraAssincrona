import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {    
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://mongo:27017/calculator');
    console.log('--------------------Conexão com MongoDB estabelecida com sucesso------------------');

    // Eventos de conexão
    mongoose.connection.on('connected', () => {
      console.log('--------------------MongoDB conectado------------------');
    });

    mongoose.connection.on('error', (err) => {
      console.error('---------------Erro na conexão com MongoDB:---------------------', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('-----------------Conexão com MongoDB foi perdida------------------');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('----------------------MongoDB reconectado-----------------------');
    });
    
  } catch (err) {
    console.error('-----------------------Erro ao conectar ao MongoDB-----------------------', err);
  }
};
