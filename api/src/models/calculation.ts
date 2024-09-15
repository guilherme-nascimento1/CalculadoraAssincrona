import mongoose, { Schema, Document } from 'mongoose';


const CalculationSchema: Schema = new Schema({
  number1: { type: Number, required: true },
  number2: { type: Number, required: true },
  result: { type: Number },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});


export interface ICalculation extends Document {
  _id: string;
  number1: number;
  number2: number;
  result?: number;
  status?: string;
  createdAt?: Date;
}


const Calculation = mongoose.model<ICalculation>('calculations', CalculationSchema);

export default Calculation;
