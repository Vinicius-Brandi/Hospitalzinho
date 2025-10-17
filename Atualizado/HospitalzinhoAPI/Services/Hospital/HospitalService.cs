using HospitalzinhoAPI.Data;
using HospitalzinhoAPI.DTO.Hospital;
using HospitalzinhoAPI.Models;
using HospitalzinhoAPI.Models.MinisterioDaSaude.Hospital;
using Microsoft.EntityFrameworkCore;

namespace HospitalzinhoAPI.Services.Hospital
{
    public class HospitalService : IHospitalInterface
    {

        private readonly AppDbContext _context;

        public HospitalService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<HospitalUnidade>?> BuscarTodasUnidades()
        {

            try
            {

                return await _context.HospitalUnidades.ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<List<HospitalUnidade>?> CadastrarUnidade(HospitalUnidadeDTO hospitalUnidadeDTO)
        {
            try
            {
                HospitalUnidade hospitalUnidade = new HospitalUnidade()
                {
                    Nome = hospitalUnidadeDTO.Nome,
                    HospitalTipo = hospitalUnidadeDTO.HospitalTipo,
                    Endereco = new HospitalEndereco()
                    {
                        Rua = hospitalUnidadeDTO.Endereco.Rua,
                        Numero = hospitalUnidadeDTO.Endereco.Numero,
                        Complemento = hospitalUnidadeDTO.Endereco.Complemento,
                        Bairro = hospitalUnidadeDTO.Endereco.Bairro,
                        Cidade = hospitalUnidadeDTO.Endereco.Cidade,
                        CEP = hospitalUnidadeDTO.Endereco.CEP,
                    },
                    HospitalInstituicao = new HospitalInstituicao()
                    {
                        CNPJ = hospitalUnidadeDTO.HospitalInstituicao.CNPJ,
                        Nome = hospitalUnidadeDTO.HospitalInstituicao.Nome,
                        CNES = hospitalUnidadeDTO.HospitalInstituicao.CNES,
                    }
                };

                _context.Add(hospitalUnidade);
                await _context.SaveChangesAsync();

                return await _context.HospitalUnidades.ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
