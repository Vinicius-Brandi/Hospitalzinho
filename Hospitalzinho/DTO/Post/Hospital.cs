using FGB.Dominio.Atributos;
using Hospitalzinho.Entidades;
using Hospitalzinho.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Hospitalzinho.DTO.Post
{
    public class HospitalUnidadePostDto
    {
        public string CEP { get; set; }
        [Obrigar]
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Rua { get; set; }
        public string? Numero { get; set; }
        public string? Complemento { get; set; }
        [Obrigar]
        public string Nome { get; set; }
        [Obrigar]
        public string CNES { get; set; } // Código Nacional de Estabelecimentos de Saúde

        [Obrigar]
        public TipoUnidade TipoUnidade { get; set; }
        [Obrigar]
        public long InstituicaoPaiId { get; set; }
    }

}
