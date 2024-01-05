using System.ComponentModel.DataAnnotations;

namespace HillarysHairSalon.Models;

public class Customer
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
    public List<Appointment> Appointments { get; set; }
}