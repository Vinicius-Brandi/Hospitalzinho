using HospitalzinhoAPI.Models.Hospital.Paciente;
using HospitalzinhoAPI.Models.MinisterioDaSaude.Hospital;
using Microsoft.EntityFrameworkCore;

namespace HospitalzinhoAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public DbSet<PacienteModel> Pacientes { get; set; }
        public DbSet<PacienteContato> PacientesContatos { get; set; }
        public DbSet<PacienteEndereco> PacientesEnderecos { get; set; }
        public DbSet<PacienteConvenio> PacientesConvenios { get; set; }

        public DbSet<HospitalUnidade> HospitalUnidades { get; set; }
        public DbSet<HospitalInstituicao> HospitalInstituicoes { get; set; }
        public DbSet<HospitalEndereco> HospitalEnderecos { get; set; }
    }
}
