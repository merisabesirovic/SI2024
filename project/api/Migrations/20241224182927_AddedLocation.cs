using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddedLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "TouristAttractions",
                newName: "Longitude");

            migrationBuilder.AddColumn<string>(
                name: "Latitude",
                table: "TouristAttractions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "TouristAttractions");

            migrationBuilder.RenameColumn(
                name: "Longitude",
                table: "TouristAttractions",
                newName: "Location");

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
    }
}
