using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{   [Route("api/account")]
    [ApiController]
  public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<User> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager; // Inject RoleManager

    public AccountController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
        _roleManager = roleManager; // Assign RoleManager
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Create the user
            var appUser = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
            };

            var createUser = await _userManager.CreateAsync(appUser, registerDto.Password);

            if (!createUser.Succeeded)
            {
                return BadRequest(createUser.Errors);
            }

            // Assign roles to the user
            if (registerDto.Roles != null && registerDto.Roles.Any())
            {
                foreach (var role in registerDto.Roles)
                {
                    // Check if the role exists using RoleManager
                    if (!await _roleManager.RoleExistsAsync(role))
                    {
                        // Delete the created user to maintain consistency
                        await _userManager.DeleteAsync(appUser);
                        return BadRequest($"Role '{role}' does not exist.");
                    }

                    // Assign the role
                    var roleResult = await _userManager.AddToRoleAsync(appUser, role);
                    if (!roleResult.Succeeded)
                    {
                        // Delete the created user to maintain consistency
                        await _userManager.DeleteAsync(appUser);
                        return BadRequest($"Failed to add role '{role}' to user '{appUser.UserName}'.");
                    }
                }
            }
            else
            {
                // Default role assignment if no roles are provided
                await _userManager.AddToRoleAsync(appUser, "User");
            }

            // Retrieve roles for the created user
            var roles = await _userManager.GetRolesAsync(appUser);

            // Return the created user with roles and a token
            return Ok(new NewUserDto
            {
                UserName = appUser.UserName,
                Email = appUser.Email,
                Token = await _tokenService.CreateToken(appUser),
                Roles = roles // Include roles here
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


     [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto){
    if (!ModelState.IsValid)
        return BadRequest();

    // Find the user by username
    var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());
    if (user == null)
        return Unauthorized("Invalid username or password");

    // Check the password
    var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
    if (!result.Succeeded)
        return Unauthorized("Invalid username or password");

    // Get the user's roles
    var roles = await _userManager.GetRolesAsync(user);

    // Return user details with roles and token
    return Ok(new NewUserDto
    {
        UserName = user.UserName,
        Email = user.Email,
        Token = await _tokenService.CreateToken(user), // Use await here
        Roles = roles
    });
}


}}