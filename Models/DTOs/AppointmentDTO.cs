using System.ComponentModel.DataAnnotations;

namespace HillarysHairSalon.Models;

public class AppointmentDTO
{
    public int Id { get; set; }
    public int StylistId { get; set; }
    public StylistDTO Stylist { get; set; }
    public int CustomerId { get; set; }
    public CustomerDTO Customer { get; set; }
    public DateTime Scheduled { get; set; }
    public decimal? TotalCost
    {
        get
        {
            return AppointmentServices
                .Sum(aserv => aserv.Service.Cost);
        }
    }
    public bool IsComplete { get; set; }
    public bool IsCanceled { get; set; }
    public List<AppointmentServiceDTO> AppointmentServices { get; set; }
}