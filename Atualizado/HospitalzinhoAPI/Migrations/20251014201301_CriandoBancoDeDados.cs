using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HospitalzinhoAPI.Migrations
{
    /// <inheritdoc />
    public partial class CriandoBancoDeDados : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pacientes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    CNS = table.Column<string>(type: "text", nullable: false),
                    CPF = table.Column<string>(type: "text", nullable: false),
                    NomePai = table.Column<string>(type: "text", nullable: true),
                    NomeMae = table.Column<string>(type: "text", nullable: true),
                    CPFPai = table.Column<string>(type: "text", nullable: true),
                    CPFMae = table.Column<string>(type: "text", nullable: true),
                    Nacionalidade = table.Column<string>(type: "text", nullable: true),
                    Naturalidade = table.Column<string>(type: "text", nullable: true),
                    DataNascimento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Genero = table.Column<int>(type: "integer", nullable: true),
                    Etinia = table.Column<int>(type: "integer", nullable: true),
                    Escolaridade = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pacientes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PacientesContatos",
                columns: table => new
                {
                    PacienteId = table.Column<int>(type: "integer", nullable: false),
                    TelefoneResidencial = table.Column<string>(type: "text", nullable: true),
                    TelefoneCelular = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PacientesContatos", x => x.PacienteId);
                    table.ForeignKey(
                        name: "FK_PacientesContatos_Pacientes_PacienteId",
                        column: x => x.PacienteId,
                        principalTable: "Pacientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PacientesConvenios",
                columns: table => new
                {
                    PacienteId = table.Column<int>(type: "integer", nullable: false),
                    NumeroCarteirinha = table.Column<string>(type: "text", nullable: false),
                    Validade = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PacientesConvenios", x => x.PacienteId);
                    table.ForeignKey(
                        name: "FK_PacientesConvenios_Pacientes_PacienteId",
                        column: x => x.PacienteId,
                        principalTable: "Pacientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PacientesEnderecos",
                columns: table => new
                {
                    PacienteId = table.Column<int>(type: "integer", nullable: false),
                    Logradouro = table.Column<string>(type: "text", nullable: false),
                    Numero = table.Column<string>(type: "text", nullable: false),
                    Complemento = table.Column<string>(type: "text", nullable: true),
                    Bairro = table.Column<string>(type: "text", nullable: false),
                    Cidade = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    CEP = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PacientesEnderecos", x => x.PacienteId);
                    table.ForeignKey(
                        name: "FK_PacientesEnderecos_Pacientes_PacienteId",
                        column: x => x.PacienteId,
                        principalTable: "Pacientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PacientesContatos");

            migrationBuilder.DropTable(
                name: "PacientesConvenios");

            migrationBuilder.DropTable(
                name: "PacientesEnderecos");

            migrationBuilder.DropTable(
                name: "Pacientes");
        }
    }
}
