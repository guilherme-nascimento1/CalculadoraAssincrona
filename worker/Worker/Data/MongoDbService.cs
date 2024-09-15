using MongoDB.Driver;
using Worker.Models;

public class MongoDbService {
    private readonly IMongoCollection<Calculation> _calculations;

    public MongoDbService() {
        try {
            //var mongoUrl = Environment.GetEnvironmentVariable("MONGO_URL") ?? "mongodb://mongo:27017";
            //var client = new MongoClient(mongoUrl);

            var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("calculator");

            _calculations = database.GetCollection<Calculation>("calculations");

        } catch (Exception ex) {
            Console.WriteLine($"Erro ao conectar ao MongoDB: {ex.Message}");
            throw;
        }
    }

    public Calculation GetCalculationById(string id) {
        try {
            return _calculations.Find(c => c.Id == id).FirstOrDefault();
        } catch (Exception ex) {
            Console.WriteLine($"Erro ao obter cálculo com ID {id}: {ex.Message}");
            return null;
        }
    }

    // Atualiza o cálculo apenas com base no Id
    public void UpdateCalculation(string id, int result) {
        try {
            var update = Builders<Calculation>.Update
                .Set(c => c.Status, "done")
                .Set(c => c.Result, result);

            _calculations.UpdateOne(c => c.Id == id, update);
        } catch (Exception ex) {
            Console.WriteLine($"Erro ao atualizar cálculo com ID {id}: {ex.Message}");
        }
    }
}
