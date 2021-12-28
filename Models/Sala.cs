using System;
using System.Collections.Generic;

namespace CinematrixAPI.Models
{
    public partial class Sala
    {
        public Sala()
        {
            Sessoes = new HashSet<Sessao>();
        }

        public int SalaId { get; set; }
        public string Nome { get; set; } = null!;
        public int QntAssentos { get; set; }

        public virtual ICollection<Sessao> Sessoes { get; set; }
    }
}
