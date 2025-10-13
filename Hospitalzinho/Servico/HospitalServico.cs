using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospitalzinho.Servico
{
    public class HospitalServico : ServicoCrud<Hospital>
    {
        public HospitalServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
