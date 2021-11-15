using System;
using System.Collections.Generic;

namespace CinematrixAPI.Models
{
    public partial class Usuario
    {
        public int UsuarioId { get; set; }
        public string NomeUsuario { get; set; } = null!;
        public string Senha { get; set; } = null!;
        public string NivelAcesso { get; set; } = null!;
    }
}
