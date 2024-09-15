import amqp from 'amqplib';
require('dotenv').config()

export const sendToQueue = async (calculationId: string) => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'calc_queue';
    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(calculationId));

    console.log(`Mensagem enviada para a fila: ${calculationId}`);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Erro ao enviar mensagem para o RabbitMQ', error);
  }
};
