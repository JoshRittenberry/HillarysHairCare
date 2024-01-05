using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HillarysHairSalon.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<int>(type: "integer", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Cost = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stylists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<int>(type: "integer", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsAdmin = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stylists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StylistId = table.Column<int>(type: "integer", nullable: false),
                    CustomerId = table.Column<int>(type: "integer", nullable: false),
                    Scheduled = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    TotalCost = table.Column<decimal>(type: "numeric", nullable: false),
                    IsComplete = table.Column<bool>(type: "boolean", nullable: false),
                    IsCanceled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Appointments_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Appointments_Stylists_StylistId",
                        column: x => x.StylistId,
                        principalTable: "Stylists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppointmentServices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppointmentId = table.Column<int>(type: "integer", nullable: false),
                    ServiceId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppointmentServices_Appointments_AppointmentId",
                        column: x => x.AppointmentId,
                        principalTable: "Appointments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppointmentServices_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[,]
                {
                    { 1, "john.doe@example.com", "John", "Doe", 1000000001 },
                    { 2, "jane.smith@example.com", "Jane", "Smith", 1000000002 },
                    { 3, "emily.johnson@example.com", "Emily", "Johnson", 1000000003 },
                    { 4, "michael.williams@example.com", "Michael", "Williams", 1000000004 },
                    { 5, "david.brown@example.com", "David", "Brown", 1000000005 },
                    { 6, "sarah.davis@example.com", "Sarah", "Davis", 1000000006 },
                    { 7, "chris.miller@example.com", "Chris", "Miller", 1000000007 },
                    { 8, "anna.wilson@example.com", "Anna", "Wilson", 1000000008 },
                    { 9, "james.moore@example.com", "James", "Moore", 1000000009 },
                    { 10, "linda.taylor@example.com", "Linda", "Taylor", 1000000010 },
                    { 11, "robert.anderson@example.com", "Robert", "Anderson", 1000000011 },
                    { 12, "patricia.thomas@example.com", "Patricia", "Thomas", 1000000012 },
                    { 13, "mark.jackson@example.com", "Mark", "Jackson", 1000000013 },
                    { 14, "elizabeth.white@example.com", "Elizabeth", "White", 1000000014 },
                    { 15, "joseph.harris@example.com", "Joseph", "Harris", 1000000015 },
                    { 16, "susan.martin@example.com", "Susan", "Martin", 1000000016 },
                    { 17, "thomas.garcia@example.com", "Thomas", "Garcia", 1000000017 },
                    { 18, "jessica.rodriguez@example.com", "Jessica", "Rodriguez", 1000000018 }
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "Cost", "Name" },
                values: new object[,]
                {
                    { 1, 45.0m, "Women's Haircut" },
                    { 2, 25.0m, "Men's Haircut" },
                    { 3, 70.0m, "Hair Coloring" },
                    { 4, 55.0m, "Partial Highlights" },
                    { 5, 85.0m, "Full Highlights" },
                    { 6, 20.0m, "Blow Dry" },
                    { 7, 120.0m, "Keratin Treatment" },
                    { 8, 30.0m, "Deep Conditioning Treatment" },
                    { 9, 40.0m, "Simple Updo" },
                    { 10, 60.0m, "Elaborate Updo" },
                    { 11, 60.0m, "Perm" },
                    { 12, 15.0m, "Beard Trim" },
                    { 13, 20.0m, "Men's Shave" },
                    { 14, 35.0m, "Men's Hair and Beard Package" },
                    { 15, 15.0m, "Eyebrow Shaping" }
                });

            migrationBuilder.InsertData(
                table: "Stylists",
                columns: new[] { "Id", "Email", "EndDate", "FirstName", "IsActive", "IsAdmin", "LastName", "Password", "PhoneNumber", "StartDate" },
                values: new object[,]
                {
                    { 1, "hillary@example.com", null, "Hillary", true, true, "Johnson", "password1", 1234567890, new DateTime(2018, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, "james@example.com", null, "James", true, false, "Smith", "password2", 1234567891, new DateTime(2019, 5, 10, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, "emily@example.com", null, "Emily", true, false, "Davis", "password3", 1234567892, new DateTime(2020, 6, 15, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, "michael@example.com", null, "Michael", true, false, "Brown", "password4", 1234567893, new DateTime(2021, 3, 20, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, "sophia@example.com", new DateTime(2023, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sophia", false, false, "Miller", "password5", 1234567894, new DateTime(2022, 7, 30, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 6, "lucas@example.com", new DateTime(2023, 11, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Lucas", false, false, "Wilson", "password6", 1234567895, new DateTime(2023, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "Appointments",
                columns: new[] { "Id", "CustomerId", "IsCanceled", "IsComplete", "Scheduled", "StylistId", "TotalCost" },
                values: new object[,]
                {
                    { 1, 15, false, true, new DateTime(2024, 1, 1, 9, 0, 0, 0, DateTimeKind.Unspecified), 4, 0m },
                    { 2, 8, false, true, new DateTime(2024, 1, 1, 9, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 3, 5, false, true, new DateTime(2024, 1, 1, 10, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 4, 18, false, true, new DateTime(2024, 1, 1, 14, 0, 0, 0, DateTimeKind.Unspecified), 2, 0m },
                    { 5, 4, true, true, new DateTime(2024, 1, 1, 16, 0, 0, 0, DateTimeKind.Unspecified), 6, 0m },
                    { 6, 2, false, true, new DateTime(2024, 1, 1, 15, 0, 0, 0, DateTimeKind.Unspecified), 5, 0m },
                    { 7, 11, false, true, new DateTime(2024, 1, 1, 11, 0, 0, 0, DateTimeKind.Unspecified), 4, 0m },
                    { 8, 16, false, true, new DateTime(2024, 1, 1, 11, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 9, 6, false, true, new DateTime(2024, 1, 1, 12, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 10, 17, false, true, new DateTime(2024, 1, 1, 15, 0, 0, 0, DateTimeKind.Unspecified), 2, 0m },
                    { 11, 14, false, true, new DateTime(2024, 1, 1, 13, 0, 0, 0, DateTimeKind.Unspecified), 6, 0m },
                    { 12, 10, false, true, new DateTime(2024, 1, 1, 14, 0, 0, 0, DateTimeKind.Unspecified), 5, 0m },
                    { 13, 9, false, true, new DateTime(2024, 1, 1, 10, 0, 0, 0, DateTimeKind.Unspecified), 4, 0m },
                    { 14, 13, false, true, new DateTime(2024, 1, 2, 10, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 15, 7, false, true, new DateTime(2024, 1, 2, 11, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 16, 1, false, true, new DateTime(2024, 1, 2, 1, 0, 0, 0, DateTimeKind.Unspecified), 2, 0m },
                    { 17, 3, true, true, new DateTime(2024, 1, 2, 13, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 18, 1, false, true, new DateTime(2024, 1, 2, 14, 0, 0, 0, DateTimeKind.Unspecified), 5, 0m },
                    { 19, 12, false, true, new DateTime(2024, 1, 2, 9, 0, 0, 0, DateTimeKind.Unspecified), 4, 0m },
                    { 20, 5, false, true, new DateTime(2024, 1, 2, 11, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 21, 11, false, true, new DateTime(2024, 1, 2, 12, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 22, 3, false, true, new DateTime(2024, 1, 2, 2, 0, 0, 0, DateTimeKind.Unspecified), 2, 0m },
                    { 23, 5, false, true, new DateTime(2024, 1, 2, 13, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 24, 6, false, true, new DateTime(2024, 1, 3, 14, 0, 0, 0, DateTimeKind.Unspecified), 5, 0m },
                    { 25, 7, false, true, new DateTime(2024, 1, 3, 9, 0, 0, 0, DateTimeKind.Unspecified), 4, 0m },
                    { 26, 1, false, true, new DateTime(2024, 1, 3, 10, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 27, 2, false, true, new DateTime(2024, 1, 3, 11, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 28, 3, false, true, new DateTime(2024, 1, 3, 1, 0, 0, 0, DateTimeKind.Unspecified), 2, 0m },
                    { 29, 4, false, true, new DateTime(2024, 1, 3, 13, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 30, 5, true, true, new DateTime(2024, 1, 3, 14, 0, 0, 0, DateTimeKind.Unspecified), 5, 0m },
                    { 31, 6, false, true, new DateTime(2024, 1, 3, 10, 0, 0, 0, DateTimeKind.Unspecified), 4, 0m },
                    { 32, 7, false, true, new DateTime(2024, 1, 3, 11, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 33, 8, false, true, new DateTime(2024, 1, 3, 12, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 34, 9, false, true, new DateTime(2024, 1, 3, 12, 0, 0, 0, DateTimeKind.Unspecified), 2, 0m },
                    { 35, 10, false, true, new DateTime(2024, 1, 3, 14, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 36, 11, false, true, new DateTime(2024, 1, 4, 14, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 37, 12, false, true, new DateTime(2024, 1, 4, 9, 0, 0, 0, DateTimeKind.Unspecified), 4, 0m },
                    { 38, 13, false, true, new DateTime(2024, 1, 4, 10, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 39, 14, false, true, new DateTime(2024, 1, 4, 11, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 40, 15, false, true, new DateTime(2024, 1, 4, 12, 0, 0, 0, DateTimeKind.Unspecified), 2, 0m },
                    { 41, 16, true, true, new DateTime(2024, 1, 4, 13, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 42, 17, false, true, new DateTime(2024, 1, 4, 15, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 43, 18, false, true, new DateTime(2024, 1, 4, 10, 0, 0, 0, DateTimeKind.Unspecified), 4, 0m },
                    { 44, 1, false, true, new DateTime(2024, 1, 4, 11, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 45, 2, false, true, new DateTime(2024, 1, 4, 12, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 46, 1, false, true, new DateTime(2024, 1, 4, 13, 0, 0, 0, DateTimeKind.Unspecified), 2, 0m },
                    { 47, 2, false, false, new DateTime(2024, 1, 5, 13, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 48, 3, false, false, new DateTime(2024, 1, 5, 14, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 49, 4, false, false, new DateTime(2024, 1, 5, 9, 0, 0, 0, DateTimeKind.Unspecified), 4, 0m },
                    { 50, 5, false, false, new DateTime(2024, 1, 5, 10, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 51, 6, false, false, new DateTime(2024, 1, 5, 11, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 52, 7, false, false, new DateTime(2024, 1, 5, 12, 0, 0, 0, DateTimeKind.Unspecified), 2, 0m },
                    { 53, 8, false, false, new DateTime(2024, 1, 5, 14, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 54, 9, false, false, new DateTime(2024, 1, 5, 15, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 55, 10, false, false, new DateTime(2024, 1, 8, 9, 0, 0, 0, DateTimeKind.Unspecified), 4, 0m },
                    { 56, 11, false, false, new DateTime(2024, 1, 8, 10, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m },
                    { 57, 12, false, false, new DateTime(2024, 1, 9, 11, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 58, 13, false, false, new DateTime(2024, 1, 12, 12, 0, 0, 0, DateTimeKind.Unspecified), 2, 0m },
                    { 59, 14, true, false, new DateTime(2024, 1, 10, 13, 0, 0, 0, DateTimeKind.Unspecified), 1, 0m },
                    { 60, 15, false, false, new DateTime(2024, 1, 12, 14, 0, 0, 0, DateTimeKind.Unspecified), 3, 0m }
                });

            migrationBuilder.InsertData(
                table: "AppointmentServices",
                columns: new[] { "Id", "AppointmentId", "ServiceId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 1, 3 },
                    { 3, 2, 2 },
                    { 4, 2, 12 },
                    { 5, 3, 5 },
                    { 6, 4, 4 },
                    { 7, 4, 6 },
                    { 8, 5, 7 },
                    { 9, 6, 8 },
                    { 10, 7, 9 },
                    { 11, 7, 11 },
                    { 12, 8, 10 },
                    { 13, 9, 1 },
                    { 14, 9, 3 },
                    { 15, 10, 2 },
                    { 16, 11, 4 },
                    { 17, 12, 5 },
                    { 18, 13, 6 },
                    { 19, 14, 1 },
                    { 20, 14, 6 },
                    { 21, 15, 2 },
                    { 22, 15, 5 },
                    { 23, 16, 3 },
                    { 24, 16, 8 },
                    { 25, 17, 7 },
                    { 26, 17, 9 },
                    { 27, 18, 4 },
                    { 28, 18, 10 },
                    { 29, 19, 11 },
                    { 30, 19, 12 },
                    { 31, 20, 13 },
                    { 32, 20, 1 },
                    { 33, 21, 2 },
                    { 34, 21, 3 },
                    { 35, 22, 5 },
                    { 36, 22, 6 },
                    { 37, 23, 7 },
                    { 38, 23, 8 },
                    { 39, 24, 1 },
                    { 40, 24, 7 },
                    { 41, 25, 2 },
                    { 42, 25, 6 },
                    { 43, 26, 3 },
                    { 44, 27, 4 },
                    { 45, 27, 8 },
                    { 46, 28, 5 },
                    { 47, 29, 9 },
                    { 48, 30, 10 },
                    { 49, 31, 11 },
                    { 50, 32, 12 },
                    { 51, 33, 13 },
                    { 52, 33, 1 },
                    { 53, 34, 2 },
                    { 54, 35, 3 },
                    { 55, 35, 4 },
                    { 56, 36, 6 },
                    { 57, 36, 7 },
                    { 58, 37, 9 },
                    { 59, 37, 12 },
                    { 60, 38, 7 },
                    { 61, 38, 4 },
                    { 62, 38, 5 },
                    { 63, 39, 7 },
                    { 64, 40, 3 },
                    { 65, 41, 8 },
                    { 66, 41, 11 },
                    { 67, 41, 7 },
                    { 68, 42, 15 },
                    { 69, 42, 6 },
                    { 70, 42, 8 },
                    { 71, 43, 1 },
                    { 72, 43, 5 },
                    { 73, 43, 10 },
                    { 74, 44, 3 },
                    { 75, 44, 4 },
                    { 76, 45, 14 },
                    { 77, 45, 10 },
                    { 78, 45, 5 },
                    { 79, 46, 6 },
                    { 80, 46, 11 },
                    { 81, 47, 1 },
                    { 82, 48, 14 },
                    { 83, 49, 12 },
                    { 84, 50, 9 },
                    { 85, 51, 13 },
                    { 86, 51, 8 },
                    { 87, 51, 2 },
                    { 88, 52, 11 },
                    { 89, 52, 12 },
                    { 90, 52, 6 },
                    { 91, 53, 8 },
                    { 92, 54, 10 },
                    { 93, 55, 15 },
                    { 94, 56, 6 },
                    { 95, 56, 14 },
                    { 96, 56, 7 },
                    { 97, 57, 3 },
                    { 98, 58, 8 },
                    { 99, 58, 4 },
                    { 100, 59, 13 },
                    { 101, 59, 9 },
                    { 102, 60, 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_CustomerId",
                table: "Appointments",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_StylistId",
                table: "Appointments",
                column: "StylistId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentServices_AppointmentId",
                table: "AppointmentServices",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentServices_ServiceId",
                table: "AppointmentServices",
                column: "ServiceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentServices");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Stylists");
        }
    }
}
