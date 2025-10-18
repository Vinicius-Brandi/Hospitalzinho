using HospitalzinhoAPI.Models.Hospital.Paciente;
using HospitalzinhoAPI.Models.Hospital.Prontuario;
using HospitalzinhoAPI.Models.MinisterioDaSaude.Hospital;
using Microsoft.EntityFrameworkCore;

namespace HospitalzinhoAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PacienteModel>(entity =>
            {
                // Configura a propriedade 'DataNascimento' do seu 'PacienteModel'
                entity.Property(p => p.DataNascimento)
                      .HasColumnType("date"); // Mapeia para o tipo 'date' do PostgreSQL
            });
        }

        public DbSet<PacienteModel> Pacientes { get; set; }
        public DbSet<PacienteContato> PacientesContatos { get; set; }
        public DbSet<PacienteEndereco> PacientesEnderecos { get; set; }
        public DbSet<PacienteConvenio> PacientesConvenios { get; set; }

        public DbSet<HospitalUnidade> HospitalUnidades { get; set; }
        public DbSet<HospitalInstituicao> HospitalInstituicoes { get; set; }
        public DbSet<HospitalEndereco> HospitalEnderecos { get; set; }

        public DbSet<ProntuarioAlergia> ProntuarioAlergias { get; set; }
        public DbSet<ProntuarioConsulta> ProntuarioConsultas { get; set; }
        public DbSet<ProntuarioInternacao> ProntuarioInternacoes { get; set; }
        public DbSet<ProntuarioVacina> ProntuarioVacinas { get; set; }

    }
}
