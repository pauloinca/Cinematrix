using System;
using System.Collections.Generic;

namespace CinematrixAPI.Models
{
    public partial class Filme
    {
        public Filme()
        {
            Sessoes = new HashSet<Sessao>();
        }

        public int FilmeId { get; set; }
        public string Titulo { get; set; } = null!;
        public string? Descricao { get; set; }
        public string? Imagem { get; set; }
        public TimeSpan Duracao { get; set; }

        public virtual ICollection<Sessao> Sessoes { get; set; }
    }
}
