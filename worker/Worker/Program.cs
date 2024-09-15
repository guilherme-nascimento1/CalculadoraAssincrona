using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using Worker.Services;

class Program {
    static void Main(string[] args) {
        try {
            var mongoDbService = new MongoDbService();
            var calculationService = new CalculationService(mongoDbService);


            var factory = new ConnectionFactory { HostName = "localhost" };

            //var rabbitMqUrl = Environment.GetEnvironmentVariable("RABBITMQ_URL") ?? "amqp://guest:guest@rabbitmq:5672";
            //var factory = new ConnectionFactory() {
            //    Uri = new Uri(rabbitMqUrl),
            //    RequestedConnectionTimeout = TimeSpan.FromSeconds(60),  
            //    NetworkRecoveryInterval = TimeSpan.FromSeconds(10),     
            //    AutomaticRecoveryEnabled = true,                        
                                               
            //};

            using var connection = factory.CreateConnection();

            using (var channel = connection.CreateModel()) {

                // Declara a fila calc_queue no RabbitMQ
                channel.QueueDeclare(queue: "calc_queue", durable: true, exclusive: false, autoDelete: false, arguments: null);

                var consumer = new EventingBasicConsumer(channel);

                // Evento disparado ao receber uma mensagem da fila
                consumer.Received += (model, ea) => {
                    try {
                        var body = ea.Body.ToArray();
                        var calculationId = Encoding.UTF8.GetString(body);

                        Console.WriteLine($"[Worker] Recebida mensagem com ID do cálculo: {calculationId}");

                        // Processa o cálculo com o serviço de cálculo
                        calculationService.ProcessCalculation(calculationId);
                    } catch (Exception ex) {
                        Console.WriteLine($"Erro ao processar a mensagem: {ex.Message}\n{ex.StackTrace}");
                    }
                };

                // Inicia o consumo das mensagens da fila calc_queue
                channel.BasicConsume(queue: "calc_queue", autoAck: true, consumer: consumer);

                Console.WriteLine("[Worker] Aguardando mensagens...");
                Console.ReadLine();
            }

        } catch (Exception ex) {
            Console.WriteLine($"Erro na inicialização do worker: {ex.Message}\n{ex.StackTrace}");
        }
    }
}
