using CinematrixAPI.Models;
using CinematrixAPI.Services;
using CinematrixAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace CinematrixAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly CinematrixContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(CinematrixContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<Usuario?> GetUsuario(Usuario user)
        {
            var query = _context.Usuarios.Where(s => s.NomeUsuario == user.NomeUsuario && s.Senha == user.Senha).FirstOrDefault();

            if (query == null)
            {
                return null;
            }
            else
            {
                return await Task.FromResult(query);
            }            
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public ActionResult<dynamic> Authenticate([FromBody] Usuario model)
        {
            // Recupera o usuário
            var user = GetUsuario(model).Result;

            Console.WriteLine(model.NomeUsuario);

            // Verifica se o usuário existe
            if (model == null || user == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });            

            // Gera o Token            
            var token = TokenService.GenerateToken(user, _configuration);

            // Oculta a senha
            user.Senha = "";

            // Retorna os dados
            return new
            {
                user = user,
                token = token
            };

        }

        [HttpGet]
        [Route("anonymous")]
        [AllowAnonymous]
        public string Anonymous() => "Anônimo";

        [HttpGet]
        [Route("authenticated")]
        [Authorize]
        public string Authenticated() => String.Format("Autenticado - {0}", User.Identity.Name);

        [HttpGet]
        [Route("employee")]
        [Authorize(Roles = "employee,manager")]
        public string Employee() => "Funcionário";

        [HttpGet]
        [Route("manager")]
        [Authorize(Roles = "manager")]
        public string Manager() => "Gerente";
    }
}
