using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalzinhoAPI.Migrations
{
    /// <inheritdoc />
    public partial class ArrumandoDateProntuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProntuarioAlergias_Pacientes_PacienteId",
                table: "ProntuarioAlergias");

            migrationBuilder.DropForeignKey(
                name: "FK_ProntuarioConsultas_Pacientes_PacienteId",
                table: "ProntuarioConsultas");

            migrationBuilder.DropForeignKey(
                name: "FK_ProntuarioInternacoes_Pacientes_PacienteId",
                table: "ProntuarioInternacoes");

            migrationBuilder.DropForeignKey(
                name: "FK_ProntuarioVacinas_Pacientes_PacienteId",
                table: "ProntuarioVacinas");

            migrationBuilder.AlterColumn<int>(
                name: "PacienteId",
                table: "ProntuarioVacinas",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataAplicacao",
                table: "ProntuarioVacinas",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<int>(
                name: "PacienteId",
                table: "ProntuarioInternacoes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataSaida",
                table: "ProntuarioInternacoes",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataEntrada",
                table: "ProntuarioInternacoes",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<int>(
                name: "PacienteId",
                table: "ProntuarioConsultas",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataConsulta",
                table: "ProntuarioConsultas",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<int>(
                name: "PacienteId",
                table: "ProntuarioAlergias",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Validade",
                table: "PacientesConvenios",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataNascimento",
                table: "Pacientes",
                type: "timestamp without time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProntuarioAlergias_Pacientes_PacienteId",
                table: "ProntuarioAlergias",
                column: "PacienteId",
                principalTable: "Pacientes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProntuarioConsultas_Pacientes_PacienteId",
                table: "ProntuarioConsultas",
                column: "PacienteId",
                principalTable: "Pacientes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProntuarioInternacoes_Pacientes_PacienteId",
                table: "ProntuarioInternacoes",
                column: "PacienteId",
                principalTable: "Pacientes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProntuarioVacinas_Pacientes_PacienteId",
                table: "ProntuarioVacinas",
                column: "PacienteId",
                principalTable: "Pacientes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProntuarioAlergias_Pacientes_PacienteId",
                table: "ProntuarioAlergias");

            migrationBuilder.DropForeignKey(
                name: "FK_ProntuarioConsultas_Pacientes_PacienteId",
                table: "ProntuarioConsultas");

            migrationBuilder.DropForeignKey(
                name: "FK_ProntuarioInternacoes_Pacientes_PacienteId",
                table: "ProntuarioInternacoes");

            migrationBuilder.DropForeignKey(
                name: "FK_ProntuarioVacinas_Pacientes_PacienteId",
                table: "ProntuarioVacinas");

            migrationBuilder.AlterColumn<int>(
                name: "PacienteId",
                table: "ProntuarioVacinas",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataAplicacao",
                table: "ProntuarioVacinas",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<int>(
                name: "PacienteId",
                table: "ProntuarioInternacoes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataSaida",
                table: "ProntuarioInternacoes",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataEntrada",
                table: "ProntuarioInternacoes",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<int>(
                name: "PacienteId",
                table: "ProntuarioConsultas",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataConsulta",
                table: "ProntuarioConsultas",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<int>(
                name: "PacienteId",
                table: "ProntuarioAlergias",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Validade",
                table: "PacientesConvenios",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataNascimento",
                table: "Pacientes",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProntuarioAlergias_Pacientes_PacienteId",
                table: "ProntuarioAlergias",
                column: "PacienteId",
                principalTable: "Pacientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProntuarioConsultas_Pacientes_PacienteId",
                table: "ProntuarioConsultas",
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

            migrationBuilder.AddForeignKey(
                name: "FK_ProntuarioVacinas_Pacientes_PacienteId",
                table: "ProntuarioVacinas",
                column: "PacienteId",
                principalTable: "Pacientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
