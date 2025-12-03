using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MoviesController : ControllerBase
    {
        private readonly TMDBService _tmdb;

        public MoviesController(TMDBService tmdb)
        {
            _tmdb = tmdb;
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopular([FromQuery] int page = 1)
        {
            var data = await _tmdb.GetPopularMovies(page);
            return Ok(data);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string q)
        {
            var data = await _tmdb.SearchMovies(q);
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var details = await _tmdb.GetMovieDetails(id);
            return Ok(details);
        }

        [HttpGet("{id}/credits")]
        public async Task<IActionResult> Credits(int id)
        {
            var credits = await _tmdb.GetMovieCredits(id);
            return Ok(credits);
        }

        [HttpGet("genres")]
        public async Task<IActionResult> Genres()
        {
            var genres = await _tmdb.GetGenres();
            return Ok(genres);
        }

        [HttpGet("discover")]
        public async Task<IActionResult> Discover([FromQuery] int genre, [FromQuery] int page = 1)
        {
            var data = await _tmdb.DiscoverMoviesByGenre(genre, page);
            return Ok(data);
        }
    }
}
