using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Worker.Models {
    public class Calculation {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {
            get; set;
        }

        [BsonElement("number1")]
        public int Number1 {
            get; set;
        }

        [BsonElement("number2")]
        public int Number2 {
            get; set;
        }

        [BsonElement("result")]
        public int? Result {
            get; set;
        }

        [BsonElement("status")]
        public string Status {
            get; set;
        }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [BsonElement("__v")]
        public int Version {
            get; set;
        }
    }
}
