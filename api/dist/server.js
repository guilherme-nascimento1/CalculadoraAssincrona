"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const calcRoutes_1 = __importDefault(require("./routes/calcRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// CORS - COMUNICACAO ENTRE O FRONT E O BACKEND.
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200', // ROTA DO FRONTEND
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.options('*', (0, cors_1.default)());
// VALIDAR SE ESTÁ CONECTANDO AO BANCO. - DEBUG.
(0, db_1.connectDB)().then(() => {
    const checkMongoConnection = () => {
        const state = mongoose_1.default.connection.readyState;
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
    app.use('/api', calcRoutes_1.default);
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
});
