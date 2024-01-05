using System.ComponentModel.DataAnnotations;

namespace HillarysHairSalon.Models;

public class ServiceDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Cost { get; set; }
}