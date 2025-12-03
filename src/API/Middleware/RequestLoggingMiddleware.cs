using Infrastructure.Data;
using Core.Entities;

namespace API.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, AppDbContext db)
        {
            var log = new Log
            {
                Endpoint_Requisicao = context.Request.Path,
                DataHora_Requisicao = DateTime.UtcNow,
            };

            // Vincula usuário autenticado, se existir
            var userIdClaim = context.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                            ?? context.User.FindFirst("sub");
            log.Id_Usuario = userIdClaim != null ? int.Parse(userIdClaim.Value) : (int?)null;

            try
            {
                await _next(context);
                log.Obteve_Sucesso = context.Response.StatusCode < 400;
            }
            catch
            {
                log.Obteve_Sucesso = false;
                throw;
            }
            finally
            {
                try
                {
                    db.Logs.Add(log);
                    await db.SaveChangesAsync();
                }
                catch
                {
                    // evite quebrar a requisição caso o log falhe
                }
            }
        }

    }
}
