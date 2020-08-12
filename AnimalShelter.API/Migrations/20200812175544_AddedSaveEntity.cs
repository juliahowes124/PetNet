using Microsoft.EntityFrameworkCore.Migrations;

namespace AnimalShelter.API.Migrations
{
    public partial class AddedSaveEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Saves",
                columns: table => new
                {
                    SaverId = table.Column<int>(nullable: false),
                    SaveeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Saves", x => new { x.SaverId, x.SaveeId });
                    table.ForeignKey(
                        name: "FK_Saves_Animals_SaveeId",
                        column: x => x.SaveeId,
                        principalTable: "Animals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Saves_Users_SaverId",
                        column: x => x.SaverId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Saves_SaveeId",
                table: "Saves",
                column: "SaveeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Saves");
        }
    }
}
