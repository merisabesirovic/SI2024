using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class _ : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "TouristAttractions");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "TouristAttractions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "TouristAttractions");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "TouristAttractions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
