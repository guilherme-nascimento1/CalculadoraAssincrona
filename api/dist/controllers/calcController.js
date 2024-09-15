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
exports.getCalculationResult = exports.createCalculation = void 0;
const rabbitService_1 = require("../services/rabbitService");
const calculation_1 = __importDefault(require("../models/calculation"));
const createCalculation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number1, number2 } = req.body;
    try {
        const newCalculation = new calculation_1.default({
            number1,
            number2,
            status: 'pending'
        });
        const savedCalculation = yield newCalculation.save();
        console.log('Documento salvo no MongoDB:', savedCalculation);
        (0, rabbitService_1.sendToQueue)(savedCalculation._id.toString());
        console.log("Mensagem enviada com sucesso para o RabbitMQ");
        res.status(201).json(savedCalculation);
    }
    catch (error) {
        console.error('Erro ao criar cálculo:', error);
        res.status(500).json({ error: 'Erro ao criar o cálculo' });
    }
});
exports.createCalculation = createCalculation;
const getCalculationResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const calculation = yield calculation_1.default.findById(id);
        if (!calculation) {
            return res.status(404).json({ error: 'Cálculo não encontrado' });
        }
        res.status(200).json(calculation);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o cálculo' });
    }
});
exports.getCalculationResult = getCalculationResult;
