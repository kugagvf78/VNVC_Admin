namespace VNVC_Admin.Models
{
    public class Users
    {
        public string UserId { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public string Job { get; set; } = "Chưa xác định";
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string NumberBHYT { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        public string Address { get; set; }
        public string IdCardNumber { get; set; }
        public string Ethnicity { get; set; }
        public string Nationality { get; set; }

        public int Age
        {
            get
            {
                var now = DateTime.Now;
                int age = now.Year - DateOfBirth.Year;
                if (now.Month < DateOfBirth.Month || (now.Month == DateOfBirth.Month && now.Day < DateOfBirth.Day))
                {
                    age--;
                }
                return age;
            }
        }

        public string FormattedDateOfBirth
        {
            get => DateOfBirth.ToString("dd/MM/yyyy");
        }
    }
}
