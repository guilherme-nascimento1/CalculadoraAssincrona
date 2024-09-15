namespace Worker.Services {
    public class CalculationService {
        private readonly MongoDbService _mongoDbService;

        public CalculationService(MongoDbService mongoDbService) {
            _mongoDbService = mongoDbService;
        }

        public void ProcessCalculation(string calculationId) {
            try {
                var calculation = _mongoDbService.GetCalculationById(calculationId);

                if (calculation != null && calculation.Status == "pending") {

                    var result = calculation.Number1 + calculation.Number2;

                    _mongoDbService.UpdateCalculation(calculation.Id, result);

                    Console.WriteLine($"[Worker] Cálculo do Documento: {calculationId} =========> {calculation.Number1} + {calculation.Number2} = {result}");
                } else {

                    Console.WriteLine($"[Worker] Cálculo com ID {calculationId} não encontrado ou já processado.");
                }
            } catch (Exception ex) {

                Console.WriteLine($"Erro ao processar o cálculo com ID {calculationId}: {ex.Message}");
            }
        }
    }
}
