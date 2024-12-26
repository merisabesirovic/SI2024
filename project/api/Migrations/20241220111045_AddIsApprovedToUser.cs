using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddIsApprovedToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "297886d0-3354-41ef-89a7-645edc3c4694", null, "Local_company", "LOCAL_COMPANY" },
                    { "5cc2b6a0-a131-4bc8-956c-c8b807582895", null, "User", "USER" },
                    { "7eb4d6a8-37c3-419c-a805-3257207f2aaf", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "297886d0-3354-41ef-89a7-645edc3c4694");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5cc2b6a0-a131-4bc8-956c-c8b807582895");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7eb4d6a8-37c3-419c-a805-3257207f2aaf");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "AspNetUsers");

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
    }
}
