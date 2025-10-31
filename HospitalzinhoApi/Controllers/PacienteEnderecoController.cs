using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;
using System;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class PacienteEnderecoController : CrudControllerBase<PacienteEndereco, PacienteEndereco>
    {
        PacienteEnderecoServico _servico;
        public PacienteEnderecoController(PacienteEnderecoServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico;
        }
    }
}
