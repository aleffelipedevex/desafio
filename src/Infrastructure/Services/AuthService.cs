using Core.Entities; 
using Infrastructure.Data; 
using Microsoft.EntityFrameworkCore; 
using Microsoft.Extensions.Configuration; 
using System.IdentityModel.Tokens.Jwt; 
using System.Security.Claims; 
using System.Text; 
using Microsoft.IdentityModel.Tokens; 

namespace Infrastructure.Services 
{ 
    public class AuthService 
    { 
        private readonly AppDbContext _context; 
        private readonly IConfiguration _config; 
        
        public AuthService(AppDbContext context, IConfiguration config) { _context = context; _config = config; } 
        
        public async Task<(string accessToken, string refreshToken)?> Authenticate(string email, string password) 
        { 
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email); 
            
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash)) return null; 
            
            var accessToken = GenerateJwtToken(user); 
            var refreshToken = Guid.NewGuid().ToString(); 
            
            user.RefreshToken = refreshToken; 
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7); 
            
            await _context.SaveChangesAsync(); 
            
            return (accessToken, refreshToken); 
        } 
        
        public string GenerateJwtToken(User user) { var key = Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]!); var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256); var claims = new[] { new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()), new Claim(JwtRegisteredClaimNames.Email, user.Email) }; var token = new JwtSecurityToken( _config["JwtSettings:Issuer"], _config["JwtSettings:Audience"], claims, expires: DateTime.UtcNow.AddMinutes(15), signingCredentials: credentials ); return new JwtSecurityTokenHandler().WriteToken(token); } public async Task<string?> Refresh(string refreshToken) { var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken); if (user == null || user.RefreshTokenExpiryTime < DateTime.UtcNow) return null; return GenerateJwtToken(user); } } }