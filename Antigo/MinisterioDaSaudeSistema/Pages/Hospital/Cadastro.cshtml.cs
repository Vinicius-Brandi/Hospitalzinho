using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MinisterioDaSaudeSistema.Pages.Hospital;

public class Cadastro : PageModel
{
    public void OnGet()
    {
        
    }
    
    public IActionResult OnGetTipoCadastro(string tipoCadastro)
    {
        switch (tipoCadastro)
        {
            case "instituicao":
                return Partial("_CadastrarHospitalInstituicao");
            case "unidade":
                return Partial("_CadastrarHospitalUnidade");
            default:
                return Page();
        }
    }
}