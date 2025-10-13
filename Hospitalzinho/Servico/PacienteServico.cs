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
    public class PacienteServico : ServicoCrud<Paciente>
    {
        public PacienteServico(IRepositorioSessao repositorio) : base(repositorio)
        {

        }
    }
}
