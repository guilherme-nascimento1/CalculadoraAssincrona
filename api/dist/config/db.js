"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URL || 'mongodb://mongo:27017/calculator');
        console.log('--------------------Conexão com MongoDB estabelecida com sucesso------------------');
        // Eventos de conexão
        mongoose_1.default.connection.on('connected', () => {
            console.log('--------------------MongoDB conectado------------------');
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.error('---------------Erro na conexão com MongoDB:---------------------', err);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('-----------------Conexão com MongoDB foi perdida------------------');
        });
        mongoose_1.default.connection.on('reconnected', () => {
            console.log('----------------------MongoDB reconectado-----------------------');
        });
    }
    catch (err) {
        console.error('-----------------------Erro ao conectar ao MongoDB-----------------------', err);
    }
});
exports.connectDB = connectDB;
