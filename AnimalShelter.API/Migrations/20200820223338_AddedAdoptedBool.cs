using Microsoft.EntityFrameworkCore.Migrations;

namespace AnimalShelter.API.Migrations
{
    public partial class AddedAdoptedBool : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Adopted",
                table: "Animals",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Adopted",
                table: "Animals");
        }
    }
}
