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
exports.sendToQueue = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
require('dotenv').config();
const sendToQueue = (calculationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield amqplib_1.default.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        const channel = yield connection.createChannel();
        const queue = 'calc_queue';
        yield channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(calculationId));
        console.log(`Mensagem enviada para a fila: ${calculationId}`);
        setTimeout(() => {
            connection.close();
        }, 500);
    }
    catch (error) {
        console.error('Erro ao enviar mensagem para o RabbitMQ', error);
    }
});
exports.sendToQueue = sendToQueue;
