using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "109eb341-2d52-4f97-a83b-5c1e3f34f629");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f00841f9-fc71-40d9-9613-8edcab7d7d7b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5b0172b-3dfb-4529-a2e5-ee1768a48bbf");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "68067305-6b1f-454b-bb04-33f2881a75cc", null, "Admin", "ADMIN" },
                    { "82fae153-a351-49db-8724-3ad709296dea", null, "Local_company", "LOCAL_COMPANY" },
                    { "a4ed2caf-c889-45e8-91d9-94e657fc7768", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "68067305-6b1f-454b-bb04-33f2881a75cc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "82fae153-a351-49db-8724-3ad709296dea");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a4ed2caf-c889-45e8-91d9-94e657fc7768");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "109eb341-2d52-4f97-a83b-5c1e3f34f629", null, "Local_company", "LOCAL_COMPANY" },
                    { "f00841f9-fc71-40d9-9613-8edcab7d7d7b", null, "User", "USER" },
                    { "f5b0172b-3dfb-4529-a2e5-ee1768a48bbf", null, "Admin", "ADMIN" }
                });
        }
    }
}
