using Microsoft.AspNetCore.Mvc;

namespace MinisterioDaSaudeMVC.Controllers
{
    public class HospitalController : Controller
    {
        public IActionResult Cadastro()
        {
            return View();
        }

        public IActionResult Consulta()
        {
            return View();
        }
    }
}
