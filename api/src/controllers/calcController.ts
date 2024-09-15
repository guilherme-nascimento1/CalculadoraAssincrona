import { Request, Response } from 'express';
import { sendToQueue } from '../services/rabbitService';
import Calculation from '../models/calculation';

export const createCalculation = async (req: Request, res: Response) => {
  const { number1, number2 } = req.body;

  try {
    const newCalculation = new Calculation({ 
      number1, 
      number2, 
      status: 'pending'  
    });

  
    const savedCalculation = await newCalculation.save();
    console.log('Documento salvo no MongoDB:', savedCalculation);

   
    sendToQueue(savedCalculation._id.toString());
    console.log("Mensagem enviada com sucesso para o RabbitMQ");

  
    res.status(201).json(savedCalculation);
  } catch (error) {
    console.error('Erro ao criar cálculo:', error);
    res.status(500).json({ error: 'Erro ao criar o cálculo' });
  }
};

export const getCalculationResult = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const calculation = await Calculation.findById(id);
    if (!calculation) {
      return res.status(404).json({ error: 'Cálculo não encontrado' });
    }

    res.status(200).json(calculation);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o cálculo' });
  }
};
