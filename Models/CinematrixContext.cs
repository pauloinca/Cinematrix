using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CinematrixAPI.Models
{
    public partial class CinematrixContext : DbContext
    {
        public CinematrixContext()
        {
        }

        public CinematrixContext(DbContextOptions<CinematrixContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Filme> Filmes { get; set; } = null!;
        public virtual DbSet<Sala> Salas { get; set; } = null!;
        public virtual DbSet<Sessao> Sessoes { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        public void MarkAsModified(Filme item)
        {
            Entry(item).State = EntityState.Modified;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Filme>(entity =>
            {
                entity.HasIndex(e => e.Titulo, "Unique_Titulo")
                    .IsUnique();

                entity.Property(e => e.Descricao)
                    .HasMaxLength(800)
                    .IsUnicode(false);

                entity.Property(e => e.Duracao).HasColumnType("time(0)");

                entity.Property(e => e.Imagem)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Titulo)
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Sala>(entity =>
            {
                entity.Property(e => e.Nome)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.QntAssentos).HasColumnName("Qnt_Assentos");
            });

            modelBuilder.Entity<Sessao>(entity =>
            {
                entity.HasKey(e => e.SessaoId);

                entity.Property(e => e.Animacao)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Audio)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Data).HasColumnType("date");

                entity.Property(e => e.HorarioFim).HasColumnName("Horario_Fim");

                entity.Property(e => e.HorarioInicio).HasColumnName("Horario_Inicio");

                entity.Property(e => e.ValorIngresso)
                    .HasColumnType("money")
                    .HasColumnName("Valor_Ingresso");

                entity.HasOne(d => d.Filme)
                    .WithMany(p => p.Sessoes)
                    .HasForeignKey(d => d.FilmeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sessoes_Filmes");

                entity.HasOne(d => d.Sala)
                    .WithMany(p => p.Sessoes)
                    .HasForeignKey(d => d.SalaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sessoes_Salas");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.NivelAcesso)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("Nivel_Acesso");

                entity.Property(e => e.NomeUsuario)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("Nome_Usuario");

                entity.Property(e => e.Senha)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
