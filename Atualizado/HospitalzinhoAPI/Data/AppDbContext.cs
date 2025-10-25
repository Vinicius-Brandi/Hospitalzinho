using HospitalzinhoAPI.Models.Hospital.Paciente;
using HospitalzinhoAPI.Models.Hospital.Prontuario;
using HospitalzinhoAPI.Models.MinisterioDaSaude.Hospital;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

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

            // 🔧 Define que todo DateTime será sem timezone
            var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
                v => DateTime.SpecifyKind(v, DateTimeKind.Unspecified),
                v => DateTime.SpecifyKind(v, DateTimeKind.Unspecified)
            );

            var nullableDateTimeConverter = new ValueConverter<DateTime?, DateTime?>(
                v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Unspecified) : v,
                v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Unspecified) : v
            );

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(DateTime))
                    {
                        property.SetValueConverter(dateTimeConverter);
                        property.SetColumnType("timestamp without time zone");
                    }

                    if (property.ClrType == typeof(DateTime?))
                    {
                        property.SetValueConverter(nullableDateTimeConverter);
                        property.SetColumnType("timestamp without time zone");
                    }
                }
            }
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
