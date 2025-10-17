namespace HospitalzinhoAPI.Models
{
    public class ResponseModel<T>
    {
        public T? Dado { get; set; }
        public string Mensagem { get; set; }
        public bool Status { get; set; }
    }
}
