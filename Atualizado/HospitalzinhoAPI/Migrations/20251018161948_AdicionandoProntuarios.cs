using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HospitalzinhoAPI.Migrations
{
    /// <inheritdoc />
    public partial class AdicionandoProntuarios : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProntuarioAlergias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DescricaoAlergia = table.Column<string>(type: "text", nullable: false),
                    PacienteModelId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProntuarioAlergias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProntuarioAlergias_Pacientes_PacienteModelId",
                        column: x => x.PacienteModelId,
                        principalTable: "Pacientes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProntuarioConsultas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataConsulta = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Especialidade = table.Column<string>(type: "text", nullable: false),
                    Resumo = table.Column<string>(type: "text", nullable: false),
                    PacienteId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProntuarioConsultas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProntuarioConsultas_Pacientes_PacienteId",
                        column: x => x.PacienteId,
                        principalTable: "Pacientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProntuarioInternacoes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataEntrada = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DataSaida = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    MotivoInternacao = table.Column<string>(type: "text", nullable: false),
                    PacienteModelId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProntuarioInternacoes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProntuarioInternacoes_Pacientes_PacienteModelId",
                        column: x => x.PacienteModelId,
                        principalTable: "Pacientes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProntuarioVacinas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    Dose = table.Column<string>(type: "text", nullable: false),
                    DataAplicacao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PacienteId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProntuarioVacinas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProntuarioVacinas_Pacientes_PacienteId",
                        column: x => x.PacienteId,
                        principalTable: "Pacientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProntuarioAlergias_PacienteModelId",
                table: "ProntuarioAlergias",
                column: "PacienteModelId");

            migrationBuilder.CreateIndex(
                name: "IX_ProntuarioConsultas_PacienteId",
                table: "ProntuarioConsultas",
                column: "PacienteId");

            migrationBuilder.CreateIndex(
                name: "IX_ProntuarioInternacoes_PacienteModelId",
                table: "ProntuarioInternacoes",
                column: "PacienteModelId");

            migrationBuilder.CreateIndex(
                name: "IX_ProntuarioVacinas_PacienteId",
                table: "ProntuarioVacinas",
                column: "PacienteId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProntuarioAlergias");

            migrationBuilder.DropTable(
                name: "ProntuarioConsultas");

            migrationBuilder.DropTable(
                name: "ProntuarioInternacoes");

            migrationBuilder.DropTable(
                name: "ProntuarioVacinas");
        }
    }
}
