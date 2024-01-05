using System.ComponentModel.DataAnnotations;

namespace HillarysHairSalon.Models;

public class Appointment
{
    public int Id { get; set; }
    [Required]
    public int StylistId { get; set; }
    public Stylist Stylist { get; set; }
    [Required]
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    [Required]
    public DateTime Scheduled { get; set; }
    [Required]
    public bool IsComplete { get; set; }
    [Required]
    public bool IsCanceled { get; set; }
    public List<AppointmentService> AppointmentServices { get; set; }
}