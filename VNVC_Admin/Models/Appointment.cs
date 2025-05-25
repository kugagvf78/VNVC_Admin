namespace VNVC_Admin.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string VaccineType { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Status { get; set; } // e.g., "Pending", "Confirmed", "Cancelled"
        public string ClinicLocation { get; set; }
    }
}
