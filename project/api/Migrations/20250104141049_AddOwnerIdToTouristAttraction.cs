using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddOwnerIdToTouristAttraction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "TouristAttractions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "56214309-7f80-4968-8f34-2b5c502a7c1a", null, "Local_company", "LOCAL_COMPANY" },
                    { "b1161fda-3e09-4e1b-aeaa-194ca5239f4f", null, "User", "USER" },
                    { "ca33d7c2-2c60-4a8f-96bc-5949f727124c", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "56214309-7f80-4968-8f34-2b5c502a7c1a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b1161fda-3e09-4e1b-aeaa-194ca5239f4f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ca33d7c2-2c60-4a8f-96bc-5949f727124c");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "TouristAttractions");

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
    }
}
