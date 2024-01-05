using System.ComponentModel.DataAnnotations;

namespace HillarysHairSalon.Models;

public class Stylist
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public int PhoneNumber { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    [Required]
    public bool IsActive { get; set; }
    [Required]
    public bool IsAdmin { get; set; }
    public List<Appointment> Appointments { get; set; }
}