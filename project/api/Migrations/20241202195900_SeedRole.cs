using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class SeedRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6c8fd9f3-8a09-4da8-8c0a-937e190740e3", null, "Admin", "ADMIN" },
                    { "aeba09d6-2f0c-40ba-98ab-68637b8fcd0f", null, "User", "USER" },
                    { "be80114d-3763-442c-87c3-36752b24d113", null, "Local_company", "LOCAL_COMPANY" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6c8fd9f3-8a09-4da8-8c0a-937e190740e3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aeba09d6-2f0c-40ba-98ab-68637b8fcd0f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "be80114d-3763-442c-87c3-36752b24d113");
        }
    }
}
