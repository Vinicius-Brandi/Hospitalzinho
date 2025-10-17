using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HospitalzinhoAPI.Migrations
{
    /// <inheritdoc />
    public partial class AdicionandoHospital : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HospitalInstituicoes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    CNES = table.Column<string>(type: "text", nullable: false),
                    CNPJ = table.Column<string>(type: "text", nullable: false),
                    TokenAcesso = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HospitalInstituicoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HospitalUnidades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    HospitalTipo = table.Column<int>(type: "integer", nullable: false),
                    HospitalInstituicaoId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HospitalUnidades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HospitalUnidades_HospitalInstituicoes_HospitalInstituicaoId",
                        column: x => x.HospitalInstituicaoId,
                        principalTable: "HospitalInstituicoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HospitalEnderecos",
                columns: table => new
                {
                    HospitalUnidadeId = table.Column<int>(type: "integer", nullable: false),
                    CEP = table.Column<string>(type: "text", nullable: false),
                    Cidade = table.Column<string>(type: "text", nullable: false),
                    Bairro = table.Column<string>(type: "text", nullable: false),
                    Rua = table.Column<string>(type: "text", nullable: false),
                    Numero = table.Column<string>(type: "text", nullable: false),
                    Complemento = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HospitalEnderecos", x => x.HospitalUnidadeId);
                    table.ForeignKey(
                        name: "FK_HospitalEnderecos_HospitalUnidades_HospitalUnidadeId",
                        column: x => x.HospitalUnidadeId,
                        principalTable: "HospitalUnidades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HospitalUnidades_HospitalInstituicaoId",
                table: "HospitalUnidades",
                column: "HospitalInstituicaoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HospitalEnderecos");

            migrationBuilder.DropTable(
                name: "HospitalUnidades");

            migrationBuilder.DropTable(
                name: "HospitalInstituicoes");
        }
    }
}
