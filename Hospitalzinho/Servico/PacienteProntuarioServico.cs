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
    public class PacienteProntuarioServico : ServicoCrud<PacienteProntuario>
    {
        public PacienteProntuarioServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
