using System.ComponentModel.DataAnnotations;

namespace HillarysHairSalon.Models;

public class CustomerDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int PhoneNumber { get; set; }
    public string Email { get; set; }
    public List<AppointmentDTO> Appointments { get; set; }
}