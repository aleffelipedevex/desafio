using Microsoft.AspNetCore.Mvc;
using API.Auth;
using Infrastructure.Services;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly AppDbContext _dbContext;

        public AuthController(AuthService authService, AppDbContext dbContext)
        {
            _authService = authService;
            _dbContext = dbContext;
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> Me()
        {
            // Pega a claim "sub" que armazenamos com o user.Id
            var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub);
            if (userIdClaim == null) return Unauthorized();

            var userId = int.Parse(userIdClaim.Value);

            var user = await _dbContext.Users
                .Where(u => u.Id == userId)
                .Select(u => new { u.Id, u.Name, u.Email, u.Role })
                .FirstOrDefaultAsync();

            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _authService.Authenticate(request.Email, request.Password);

            if (result == null)
                return Unauthorized(new { message = "Email ou senha inválidos" });

            return Ok(new
            {
                accessToken = result.Value.accessToken,
                refreshToken = result.Value.refreshToken
            });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
        {
            var newToken = await _authService.Refresh(request.RefreshToken);

            if (newToken == null)
                return Unauthorized(new { message = "Refresh token inválido ou expirado" });

            return Ok(new { accessToken = newToken });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }

    public class RefreshRequest
    {
        public string RefreshToken { get; set; } = null!;
    }
}
