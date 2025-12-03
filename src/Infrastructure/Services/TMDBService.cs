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
            _http = new HttpClient();
            _http.BaseAddress = new Uri(_config["TMDB:BaseUrl"]!);
            _http.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _config["TMDB:BearerToken"]);
        }

        private async Task<T?> GetAsync<T>(string endpoint)
        {
            var response = await _http.GetAsync(endpoint);

            if (!response.IsSuccessStatusCode)
                return default;

            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<T>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public Task<object?> GetPopularMovies(int page = 1) =>
            GetAsync<object>($"movie/popular?page={page}");

        public Task<object?> SearchMovies(string query) =>
            GetAsync<object>($"search/movie?query={query}");

        public Task<object?> GetMovieDetails(int id) =>
            GetAsync<object>($"movie/{id}");

        public Task<object?> GetMovieCredits(int id) =>
            GetAsync<object>($"movie/{id}/credits");

        public Task<object?> GetGenres() =>
            GetAsync<object>("genre/movie/list");

        public Task<object?> DiscoverMoviesByGenre(int genre, int page) => 
            GetAsync<object>($"discover/movie?with_genres={genre}&page={page}");
    }
}
