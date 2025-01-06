using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedAttractionIdToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "CreatedAttractionId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "073f65f0-42f2-47d2-8473-00696fdb7368", null, "Local_company", "LOCAL_COMPANY" },
                    { "0abf4e5a-305c-4f82-8034-23f79f11e4f6", null, "User", "USER" },
                    { "3eb3d004-028a-4623-b95a-c0fa1bc4140d", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "073f65f0-42f2-47d2-8473-00696fdb7368");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0abf4e5a-305c-4f82-8034-23f79f11e4f6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3eb3d004-028a-4623-b95a-c0fa1bc4140d");

            migrationBuilder.DropColumn(
                name: "CreatedAttractionId",
                table: "AspNetUsers");

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
    }
}
