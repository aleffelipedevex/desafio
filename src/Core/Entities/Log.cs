namespace Core.Entities
{
    public class Log
    {
        public int Id { get; set; }
        public int? Id_Usuario { get; set; } // pode ser null
        public string? Endpoint_Requisicao { get; set; }
        public DateTime DataHora_Requisicao { get; set; }
        public bool Obteve_Sucesso { get; set; }
    }
}
