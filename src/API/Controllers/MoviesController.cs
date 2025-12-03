using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using System.Text.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MoviesController : ControllerBase
    {
        private readonly TMDBService _tmdb;
        private readonly IConnectionMultiplexer _redis;

        public MoviesController(TMDBService tmdb, IConnectionMultiplexer redis)
        {
            _tmdb = tmdb;
            _redis = redis;
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopular([FromQuery] int page = 1)
        {
            var cacheKey = $"popular_movies_page_{page}";
            return await GetOrSetCache(cacheKey, () => _tmdb.GetPopularMovies(page));
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string q)
        {
            var cacheKey = $"search_movies_{q}";
            return await GetOrSetCache(cacheKey, () => _tmdb.SearchMovies(q));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var db = _redis.GetDatabase();
            var cacheKey = $"movie_details_{id}";

            var cached = await db.StringGetAsync(cacheKey);
            if (!cached.IsNullOrEmpty)
                return Ok(JsonSerializer.Deserialize<object>(cached));

            var details = await _tmdb.GetMovieDetails(id);
            await db.StringSetAsync(cacheKey, JsonSerializer.Serialize(details), TimeSpan.FromHours(1));

            return Ok(details);
        }

        [HttpGet("{id}/credits")]
        public async Task<IActionResult> Credits(int id)
        {
            var cacheKey = $"movie_credits_{id}";
            return await GetOrSetCache(cacheKey, () => _tmdb.GetMovieCredits(id), TimeSpan.FromHours(1));
        }

        [HttpGet("genres")]
        public async Task<IActionResult> Genres()
        {
            var cacheKey = "movie_genres";
            return await GetOrSetCache(cacheKey, () => _tmdb.GetGenres(), TimeSpan.FromHours(24));
        }

        [HttpGet("discover")]
        public async Task<IActionResult> Discover([FromQuery] int genre, [FromQuery] int page = 1)
        {
            var cacheKey = $"discover_genre_{genre}_page_{page}";
            return await GetOrSetCache(cacheKey, () => _tmdb.DiscoverMoviesByGenre(genre, page));
        }

        private async Task<IActionResult> GetOrSetCache(string cacheKey, Func<Task<object?>> fetchFunc, TimeSpan? expiry = null)
        {
            var db = _redis.GetDatabase();

            // Tenta recuperar do cache
            var cached = await db.StringGetAsync(cacheKey);
            if (!cached.IsNullOrEmpty)
                return Content(cached, "application/json");

            // Se não tiver no cache, busca os dados
            var data = await fetchFunc();

            // Serializa e salva no Redis
            await db.StringSetAsync(cacheKey, JsonSerializer.Serialize(data), expiry ?? TimeSpan.FromMinutes(30));

            return Ok(data);
        }

    }
}
