using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalzinhoAPI.Migrations
{
    /// <inheritdoc />
    public partial class AtualizandoProntuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProntuarioAlergias_Pacientes_PacienteModelId",
                table: "ProntuarioAlergias");

            migrationBuilder.DropForeignKey(
                name: "FK_ProntuarioInternacoes_Pacientes_PacienteModelId",
                table: "ProntuarioInternacoes");

            migrationBuilder.DropIndex(
                name: "IX_ProntuarioInternacoes_PacienteModelId",
                table: "ProntuarioInternacoes");

            migrationBuilder.DropIndex(
                name: "IX_ProntuarioAlergias_PacienteModelId",
                table: "ProntuarioAlergias");

            migrationBuilder.DropColumn(
                name: "PacienteModelId",
                table: "ProntuarioInternacoes");

            migrationBuilder.DropColumn(
                name: "PacienteModelId",
                table: "ProntuarioAlergias");

            migrationBuilder.AddColumn<int>(
                name: "PacienteId",
                table: "ProntuarioInternacoes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PacienteId",
                table: "ProntuarioAlergias",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProntuarioInternacoes_PacienteId",
                table: "ProntuarioInternacoes",
                column: "PacienteId");

            migrationBuilder.CreateIndex(
                name: "IX_ProntuarioAlergias_PacienteId",
                table: "ProntuarioAlergias",
                column: "PacienteId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProntuarioAlergias_Pacientes_PacienteId",
                table: "ProntuarioAlergias",
                column: "PacienteId",
                principalTable: "Pacientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProntuarioInternacoes_Pacientes_PacienteId",
                table: "ProntuarioInternacoes",
                column: "PacienteId",
                principalTable: "Pacientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProntuarioAlergias_Pacientes_PacienteId",
                table: "ProntuarioAlergias");

            migrationBuilder.DropForeignKey(
                name: "FK_ProntuarioInternacoes_Pacientes_PacienteId",
                table: "ProntuarioInternacoes");

            migrationBuilder.DropIndex(
                name: "IX_ProntuarioInternacoes_PacienteId",
                table: "ProntuarioInternacoes");

            migrationBuilder.DropIndex(
                name: "IX_ProntuarioAlergias_PacienteId",
                table: "ProntuarioAlergias");

            migrationBuilder.DropColumn(
                name: "PacienteId",
                table: "ProntuarioInternacoes");

            migrationBuilder.DropColumn(
                name: "PacienteId",
                table: "ProntuarioAlergias");

            migrationBuilder.AddColumn<int>(
                name: "PacienteModelId",
                table: "ProntuarioInternacoes",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PacienteModelId",
                table: "ProntuarioAlergias",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProntuarioInternacoes_PacienteModelId",
                table: "ProntuarioInternacoes",
                column: "PacienteModelId");

            migrationBuilder.CreateIndex(
                name: "IX_ProntuarioAlergias_PacienteModelId",
                table: "ProntuarioAlergias",
                column: "PacienteModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProntuarioAlergias_Pacientes_PacienteModelId",
                table: "ProntuarioAlergias",
                column: "PacienteModelId",
                principalTable: "Pacientes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProntuarioInternacoes_Pacientes_PacienteModelId",
                table: "ProntuarioInternacoes",
                column: "PacienteModelId",
                principalTable: "Pacientes",
                principalColumn: "Id");
        }
    }
}
