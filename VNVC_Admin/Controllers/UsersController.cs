using Microsoft.AspNetCore.Mvc;
using VNVC_Admin.Models;

namespace VNVC_Admin.Controllers
{
	public class UsersController : Controller
	{
		// Giả lập dữ liệu với một số dữ liệu mẫu
		private static List<Users> users = new List<Users>
		{
			new Users
			{
				UserId = Guid.NewGuid().ToString(),
				FullName = "Nguyễn Văn An",
				Gender = "Nam",
				Job = "Kỹ sư phần mềm",
				DateOfBirth = new DateTime(1990, 5, 15),
				PhoneNumber = "0123456789",
				NumberBHYT = "DN1234567890",
				Email = "nguyenvanan@gmail.com",
				City = "Hà Nội",
				District = "Cầu Giấy",
				Ward = "Dịch Vọng",
				Address = "123 Đường ABC",
				IdCardNumber = "001234567890",
				Ethnicity = "Kinh",
				Nationality = "Việt Nam"
			},
			new Users
			{
				UserId = Guid.NewGuid().ToString(),
				FullName = "Trần Thị Bình",
				Gender = "Nữ",
				Job = "Bác sĩ",
				DateOfBirth = new DateTime(1985, 12, 20),
				PhoneNumber = "0987654321",
				NumberBHYT = "HN9876543210",
				Email = "tranthibinh@gmail.com",
				City = "TP.HCM",
				District = "Quận 1",
				Ward = "Phường Bến Nghé",
				Address = "456 Đường XYZ",
				IdCardNumber = "009876543210",
				Ethnicity = "Kinh",
				Nationality = "Việt Nam"
			}
		};

		// GET: Hiển thị danh sách người dùng với phân trang và tìm kiếm
		public IActionResult Index(string searchString, int page = 1, int pageSize = 10)
		{
			var filteredUsers = users.AsQueryable();

			if (!string.IsNullOrEmpty(searchString))
			{
				filteredUsers = filteredUsers.Where(u =>
					u.FullName.Contains(searchString, StringComparison.OrdinalIgnoreCase) ||
					u.Email.Contains(searchString, StringComparison.OrdinalIgnoreCase) ||
					u.PhoneNumber.Contains(searchString, StringComparison.OrdinalIgnoreCase));
			}

			var totalUsers = filteredUsers.Count();
			var totalPages = (int)Math.Ceiling((double)totalUsers / pageSize);

			var pagedUsers = filteredUsers
				.Skip((page - 1) * pageSize)
				.Take(pageSize)
				.ToList();

			ViewBag.CurrentPage = page;
			ViewBag.TotalPages = totalPages;
			ViewBag.SearchString = searchString;
			ViewBag.TotalUsers = totalUsers;

			return View(pagedUsers);
		}

		// GET: Form thêm người dùng
		public IActionResult Create()
		{
			return View();
		}

		// POST: Thêm người dùng
		[HttpPost]
		[ValidateAntiForgeryToken]
		public IActionResult Create(Users user)
		{
			if (ModelState.IsValid)
			{
				// Kiểm tra email đã tồn tại
				if (users.Any(u => u.Email == user.Email))
				{
					ModelState.AddModelError("Email", "Email này đã được sử dụng.");
					return View(user);
				}

				// Kiểm tra số điện thoại đã tồn tại
				if (users.Any(u => u.PhoneNumber == user.PhoneNumber))
				{
					ModelState.AddModelError("PhoneNumber", "Số điện thoại này đã được sử dụng.");
					return View(user);
				}

				user.UserId = Guid.NewGuid().ToString();
				users.Add(user);
				TempData["SuccessMessage"] = "Thêm người dùng thành công!";
				return RedirectToAction("Index");
			}
			return View(user);
		}

		// GET: Xem chi tiết người dùng
		public IActionResult Details(string id)
		{
			if (string.IsNullOrEmpty(id))
				return NotFound();

			var user = users.FirstOrDefault(u => u.UserId == id);
			if (user == null)
				return NotFound();

			return View(user);
		}

		// GET: Form sửa người dùng
		public IActionResult Edit(string id)
		{
			if (string.IsNullOrEmpty(id))
				return NotFound();

			var user = users.FirstOrDefault(u => u.UserId == id);
			if (user == null)
				return NotFound();

			return View(user);
		}

		// POST: Cập nhật người dùng
		[HttpPost]
		[ValidateAntiForgeryToken]
		public IActionResult Edit(Users user)
		{
			if (ModelState.IsValid)
			{
				var existingUser = users.FirstOrDefault(u => u.UserId == user.UserId);
				if (existingUser == null)
					return NotFound();

				// Kiểm tra email đã tồn tại (trừ user hiện tại)
				if (users.Any(u => u.Email == user.Email && u.UserId != user.UserId))
				{
					ModelState.AddModelError("Email", "Email này đã được sử dụng.");
					return View(user);
				}

				// Kiểm tra số điện thoại đã tồn tại (trừ user hiện tại)
				if (users.Any(u => u.PhoneNumber == user.PhoneNumber && u.UserId != user.UserId))
				{
					ModelState.AddModelError("PhoneNumber", "Số điện thoại này đã được sử dụng.");
					return View(user);
				}

				// Cập nhật thông tin
				existingUser.FullName = user.FullName;
				existingUser.Gender = user.Gender;
				existingUser.Job = user.Job;
				existingUser.DateOfBirth = user.DateOfBirth;
				existingUser.PhoneNumber = user.PhoneNumber;
				existingUser.NumberBHYT = user.NumberBHYT;
				existingUser.Email = user.Email;
				existingUser.City = user.City;
				existingUser.District = user.District;
				existingUser.Ward = user.Ward;
				existingUser.Address = user.Address;
				existingUser.IdCardNumber = user.IdCardNumber;
				existingUser.Ethnicity = user.Ethnicity;
				existingUser.Nationality = user.Nationality;

				TempData["SuccessMessage"] = "Cập nhật thông tin thành công!";
				return RedirectToAction("Index");
			}
			return View(user);
		}

		// GET: Xác nhận xóa người dùng
		public IActionResult Delete(string id)
		{
			if (string.IsNullOrEmpty(id))
				return NotFound();

			var user = users.FirstOrDefault(u => u.UserId == id);
			if (user == null)
				return NotFound();

			return View(user);
		}

		// POST: Xóa người dùng
		[HttpPost, ActionName("Delete")]
		[ValidateAntiForgeryToken]
		public IActionResult DeleteConfirmed(string id)
		{
			var user = users.FirstOrDefault(u => u.UserId == id);
			if (user == null)
				return NotFound();

			users.Remove(user);
			TempData["SuccessMessage"] = "Xóa người dùng thành công!";
			return RedirectToAction("Index");
		}

		// API: Tìm kiếm người dùng (AJAX)
		[HttpGet]
		public IActionResult SearchUsers(string term)
		{
			var results = users
				.Where(u => u.FullName.Contains(term, StringComparison.OrdinalIgnoreCase) ||
						   u.Email.Contains(term, StringComparison.OrdinalIgnoreCase) ||
						   u.PhoneNumber.Contains(term, StringComparison.OrdinalIgnoreCase))
				.Select(u => new
				{
					id = u.UserId,
					name = u.FullName,
					email = u.Email,
					phone = u.PhoneNumber
				})
				.Take(10)
				.ToList();

			return Json(results);
		}
	}
}