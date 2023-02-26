using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Secure_The_Pass_Services_Core.ServiceConfigurator;
using Secure_The_Pass_Services_Core.Services.AccountService;
using Secure_The_Pass_Services_Core.Services.AccountService.Dto;
using Secure_The_Pass_Services_Core.Services.UserService;
using Secure_The_Pass_Services_Core.Services.UserService.Dto;
using Secure_the_pass.Models;

namespace Secure_the_pass.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        IUserService userService = SecureThePassDependency.Resolve<IUserService>();
        IAccountService accountService = SecureThePassDependency.Resolve<IAccountService>();

        List<Account> user = accountService.SelectAccounts(userService.GetUser("davidvongarrel@gmail.com")).ToList();
        
        return View(user);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}