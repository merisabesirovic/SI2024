using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class remove : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "6dee0dad-30b7-46a2-adf5-f3e492a97ab8", null, "User", "USER" },
                    { "8ecae4ca-6b76-4241-8b40-8aeee4eb0cc3", null, "Local_company", "LOCAL_COMPANY" },
                    { "eb2cecd3-581e-4408-97f9-d7f5b5687481", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6dee0dad-30b7-46a2-adf5-f3e492a97ab8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ecae4ca-6b76-4241-8b40-8aeee4eb0cc3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eb2cecd3-581e-4408-97f9-d7f5b5687481");

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
    }
}
