using Secure_The_Pass_Services_Core.ServiceConfigurator;
using Secure_The_Pass_Services_Core.Services.AccountService;
using Secure_The_Pass_Services_Core.Services.Login;
using Secure_The_Pass_Services_Core.Services.UserService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

SecureThePassDependency.ConfigureServices(ServiceConfigurator.GetServices());

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

public static class ServiceConfigurator
{
    public static IServiceCollection GetServices() {
        var services = new ServiceCollection();
        _ = services.AddTransient<IUserService, UserService>();
        _ = services.AddTransient<IAccountService, AccountService>();
        _ = services.AddTransient<ILoginService, LoginService>();
        return services;
    }
}