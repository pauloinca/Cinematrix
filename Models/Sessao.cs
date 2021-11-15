using System;
using System.Collections.Generic;

namespace CinematrixAPI.Models
{
    public partial class Sessao
    {
        public int SessaoId { get; set; }
        public DateTime Data { get; set; }
        public TimeSpan HorarioInicio { get; set; }
        public TimeSpan HorarioFim { get; set; }
        public decimal ValorIngresso { get; set; }
        public string Animacao { get; set; } = null!;
        public string Audio { get; set; } = null!;
        public int FilmeId { get; set; }
        public int SalaId { get; set; }

        public virtual Filme Filme { get; set; } = null!;
        public virtual Sala Sala { get; set; } = null!;
    }
}
