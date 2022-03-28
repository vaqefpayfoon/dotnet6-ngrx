using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager,
        RoleManager<AppRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync("Admin"))
                await roleManager.CreateAsync(new AppRole() {Name = "Admin", NormalizedName = "ADMIN"});

            if (!await roleManager.RoleExistsAsync("Operator"))
                await roleManager.CreateAsync(new AppRole() {Name = "Operator", NormalizedName="OPERATOR"});

            if (!await roleManager.RoleExistsAsync("Customer"))
                await roleManager.CreateAsync(new AppRole() { Name = "Customer", NormalizedName = "Customer"});
                           
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address
                    {
                        FirstName = "Bob",
                        LastName = "Bobbity",
                        Street = "10 The Street",
                        City = "New York",
                        State = "NY",
                        Zipcode = "90210"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Admin");
            }
        }
    }
}