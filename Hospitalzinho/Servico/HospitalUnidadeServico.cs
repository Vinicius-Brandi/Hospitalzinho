using FGB.Repositorio;
using FGB.Servicos;
using Hospitalzinho.Entidades.EspecificaçõesHospital;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospitalzinho.Servico
{
    public class HospitalUnidadeServico : ServicoCrud<HospitalUnidade>
    {
        public HospitalUnidadeServico(IRepositorioSessao repositorio): base(repositorio)
        {
        }   
    }
}
