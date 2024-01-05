using System.ComponentModel.DataAnnotations;

namespace HillarysHairSalon.Models;

public class Service
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public decimal Cost { get; set; }
}