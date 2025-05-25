using Microsoft.AspNetCore.Mvc;
using VNVC_Admin.Models;

namespace VNVC_Admin.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Revenue_Chart()
        {
            return PartialView();
        }

        
        public IActionResult Appointment_completion_rate()
        {
            return PartialView();
        }

    }
}
