using HospitalzinhoAPI.DTO.Hospital;
using HospitalzinhoAPI.Models;
using HospitalzinhoAPI.Models.MinisterioDaSaude.Hospital;

namespace HospitalzinhoAPI.Services.Hospital
{
    public interface IHospitalInterface
    {
        Task<List<HospitalUnidade>?> BuscarTodasUnidades();
        Task<List<HospitalUnidade>?> CadastrarUnidade(HospitalUnidadeDTO hospitalUnidadeDTO);
    }
}
