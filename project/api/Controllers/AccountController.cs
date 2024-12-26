using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using api.Service;
using Microsoft.AspNetCore.Authorization;
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
    private readonly EmailService _emailService;

    public AccountController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager, EmailService emailService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
        _roleManager = roleManager; // Assign RoleManager
        _emailService = emailService;
    }

 [HttpPost("register")]
public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
{
    try
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);


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

        // Generate email confirmation token
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
        var confirmationLink = Url.Action("ConfirmEmail", "Account", 
            new { UserName = appUser.UserName, token = token }, Request.Scheme);
        

   
        var emailBody = $"Please confirm your email by clicking <a href='{confirmationLink}'>here</a>.";
        await _emailService.SendEmailAsync(registerDto.Email, "Confirm your email", emailBody);

        if (registerDto.Roles != null && registerDto.Roles.Any())
        {
            foreach (var role in registerDto.Roles)
            {
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _userManager.DeleteAsync(appUser); // Rollback user creation
                    return BadRequest($"Role '{role}' does not exist.");
                }

                var roleResult = await _userManager.AddToRoleAsync(appUser, role);
                if (!roleResult.Succeeded)
                {
                    await _userManager.DeleteAsync(appUser); // Rollback user creation
                    return BadRequest($"Failed to add role '{role}' to user '{appUser.UserName}'.");
                }
                if (role == "local_company")
        {
            appUser.IsApproved = false;
            await _userManager.UpdateAsync(appUser);
        }
            }
        }
        else
        {
            await _userManager.AddToRoleAsync(appUser, "User");
        }


        var roles = await _userManager.GetRolesAsync(appUser);

        return Ok(new
        {
            Message = "Registration successful. Please check your email to confirm your account."
        });
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}


  [HttpPost("login")]
public async Task<IActionResult> Login(LoginDto loginDto)
{
    if (!ModelState.IsValid)
        return BadRequest();

    var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());
    if (user == null)
        return Unauthorized("Invalid username or password");

    // Check if email is confirmed
    if (!await _userManager.IsEmailConfirmedAsync(user))
        return Unauthorized("Email not confirmed. Please check your email.");

    // Check if the user is approved (only for "Local Company" role)
    if (await _userManager.IsInRoleAsync(user, "local_company") && !user.IsApproved)
        return Unauthorized("Your account is pending admin approval.");

    var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
    if (!result.Succeeded)
        return Unauthorized("Invalid username or password");

    var roles = await _userManager.GetRolesAsync(user);

    return Ok(new NewUserDto
    {   UserId = user.Id,
        UserName = user.UserName,
        Email = user.Email,
        Token = await _tokenService.CreateToken(user),
        Roles = roles
    });
}
[Authorize(Roles = "Admin")]
[HttpPost("approve-user")]
public async Task<IActionResult> ApproveUser([FromBody] ApproveUserDto approveUserDto)
{
    var user = await _userManager.FindByIdAsync(approveUserDto.UserId);
    if (user == null)
        return NotFound("User not found.");

    user.IsApproved = approveUserDto.IsApproved;
    var result = await _userManager.UpdateAsync(user);

    if (!result.Succeeded)
        return BadRequest("Failed to update user approval status.");

    return Ok($"User '{user.UserName}' has been {(approveUserDto.IsApproved ? "approved" : "rejected")}.");
}

[HttpGet("confirm-email")]
public async Task<IActionResult> ConfirmEmail(string userName, string token)
{
    var user = await _userManager.FindByNameAsync(userName);
    if (user == null)
        return BadRequest("Invalid user.");

    var result = await _userManager.ConfirmEmailAsync(user, token);
    if (!result.Succeeded)
        return BadRequest("Email confirmation failed.");

    return Ok("Email confirmed successfully. You can now log in.");
}
[HttpPost("forgot-password")]
public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
    if (user == null)
        return BadRequest("No user found with this email.");

    var token = await _userManager.GeneratePasswordResetTokenAsync(user);

  
    var resetLink = Url.Action("ResetPassword", "Account",
        new { email = forgotPasswordDto.Email, token = token }, Request.Scheme);

    // Send the email
    var emailBody = $"Please reset your password by clicking <a href='{resetLink}'>here</a>.";
    await _emailService.SendEmailAsync(forgotPasswordDto.Email, "Reset Password", emailBody);

    return Ok("Password reset link has been sent to your email.");
}

[HttpGet("reset-password")]
public IActionResult ResetPasswordPage(string email, string token)
{
    // Return a simple message for now (can be replaced with a proper page).
    return Ok(new
    {
        Message = $"Token za promenu lozinke: {token}",
      
    });
}
[HttpPost("reset-password")]
public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
    if (user == null)
        return BadRequest("Invalid request.");

    // Reset the password
    var resetResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.NewPassword);
    if (!resetResult.Succeeded)
        return BadRequest(resetResult.Errors);

    return Ok("Password has been reset successfully.");
}



}}