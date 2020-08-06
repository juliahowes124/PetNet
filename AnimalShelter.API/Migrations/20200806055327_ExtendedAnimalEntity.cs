using Microsoft.EntityFrameworkCore.Migrations;

namespace AnimalShelter.API.Migrations
{
    public partial class ExtendedAnimalEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdoptionFee",
                table: "Animals",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Breed",
                table: "Animals",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GoodWith",
                table: "Animals",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Inquiries",
                table: "Animals",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Likes",
                table: "Animals",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Qualities",
                table: "Animals",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Saves",
                table: "Animals",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Views",
                table: "Animals",
                nullable: true,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdoptionFee",
                table: "Animals");

            migrationBuilder.DropColumn(
                name: "Breed",
                table: "Animals");

            migrationBuilder.DropColumn(
                name: "GoodWith",
                table: "Animals");

            migrationBuilder.DropColumn(
                name: "Inquiries",
                table: "Animals");

            migrationBuilder.DropColumn(
                name: "Likes",
                table: "Animals");

            migrationBuilder.DropColumn(
                name: "Qualities",
                table: "Animals");

            migrationBuilder.DropColumn(
                name: "Saves",
                table: "Animals");

            migrationBuilder.DropColumn(
                name: "Views",
                table: "Animals");
        }
    }
}
