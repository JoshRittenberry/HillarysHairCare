using System.ComponentModel.DataAnnotations;

namespace HillarysHairSalon.Models;

public class AppointmentServiceDTO
{
    public int Id { get; set; }
    public int AppointmentId { get; set; }
    public int ServiceId { get; set; }
    public ServiceDTO Service { get; set; }
}