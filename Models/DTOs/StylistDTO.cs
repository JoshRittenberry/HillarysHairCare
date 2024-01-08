using System.ComponentModel.DataAnnotations;

namespace HillarysHairSalon.Models;

public class StylistDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public long PhoneNumber { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsActive { get; set; }
    public bool IsAdmin { get; set; }
    public List<AppointmentDTO> Appointments { get; set; }
}