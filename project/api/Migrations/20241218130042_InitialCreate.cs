using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "40f367de-839b-4a49-ba84-bd23ec1be4b2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7d235e75-1acb-4209-8758-1e35f4dff24f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b61cace1-55bd-4761-b74f-58ccb71b5b1a");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "197d6304-3f2a-499c-ab9d-bd50b18a61ee", null, "User", "USER" },
                    { "713d2310-3f3e-48ce-b554-6fd6f2126aed", null, "Admin", "ADMIN" },
                    { "7c667ba8-fa13-4bb0-a7e3-38bc93b24a28", null, "Local_company", "LOCAL_COMPANY" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "197d6304-3f2a-499c-ab9d-bd50b18a61ee");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "713d2310-3f3e-48ce-b554-6fd6f2126aed");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7c667ba8-fa13-4bb0-a7e3-38bc93b24a28");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "40f367de-839b-4a49-ba84-bd23ec1be4b2", null, "Admin", "ADMIN" },
                    { "7d235e75-1acb-4209-8758-1e35f4dff24f", null, "Local_company", "LOCAL_COMPANY" },
                    { "b61cace1-55bd-4761-b74f-58ccb71b5b1a", null, "User", "USER" }
                });
        }
    }
}
