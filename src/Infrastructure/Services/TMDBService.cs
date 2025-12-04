using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;
using System.Text.Json;

namespace Infrastructure.Services
{
    public class TMDBService
    {
        private readonly HttpClient _http;
        private readonly IConfiguration _config;

        public TMDBService(IConfiguration config)
        {
            _config = config;

            var baseUrl = _config["TMDB:BaseUrl"];
            var apiKey = _config["TMDB:ApiKey"];
            _http = new HttpClient();
            _http.BaseAddress = new Uri(baseUrl!);
        }

        private async Task<T?> GetAsync<T>(string endpoint)
        {
            var fullUrl = $"{_http.BaseAddress}{endpoint}";

            var response = await _http.GetAsync(endpoint);

            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<T>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public Task<object?> GetPopularMovies(int page = 1) =>
            GetAsync<object>($"movie/popular?api_key={_config["TMDB:ApiKey"]}&page={page}");

        public Task<object?> SearchMovies(string query) =>
            GetAsync<object>($"search/movie?api_key={_config["TMDB:ApiKey"]}&query={query}");

        public Task<object?> GetMovieDetails(int id) =>
            GetAsync<object>($"movie/{id}?api_key={_config["TMDB:ApiKey"]}");

        public Task<object?> GetMovieCredits(int id) =>
            GetAsync<object>($"movie/{id}/credits?api_key={_config["TMDB:ApiKey"]}");

        public Task<object?> GetGenres() =>
            GetAsync<object>($"genre/movie/list?api_key={_config["TMDB:ApiKey"]}");

        public Task<object?> DiscoverMoviesByGenre(int genre, int page) =>
            GetAsync<object>($"discover/movie?with_genres={genre}&page={page}&api_key={_config["TMDB:ApiKey"]}");
    }
}
