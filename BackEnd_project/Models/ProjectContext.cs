using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_project.Models;

public partial class ProjectContext : DbContext
{
    public ProjectContext()
    {
    }

    public ProjectContext(DbContextOptions<ProjectContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Actor> Actors { get; set; }

    public virtual DbSet<Director> Directors { get; set; }

    public virtual DbSet<Film> Films { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;database=Project;user=root;password=;sslmode=none;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Actor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("actor");

            entity.Property(e => e.Birthday).HasColumnType("date");
            entity.Property(e => e.Name).HasMaxLength(40);
            entity.Property(e => e.Nationality).HasMaxLength(40);
            entity.Property(e => e.OscarAward).HasColumnName("Oscar_award");
            entity.Property(e => e.Sex).HasColumnType("enum('Male','Female')");
        });

        modelBuilder.Entity<Director>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("director");

            entity.Property(e => e.Birthday).HasColumnType("date");
            entity.Property(e => e.Name).HasMaxLength(40);
            entity.Property(e => e.Nationality).HasMaxLength(40);
            entity.Property(e => e.OscarAward).HasColumnName("Oscar_award");
            entity.Property(e => e.Sex).HasColumnType("enum('Male','Female')");
        });

        modelBuilder.Entity<Film>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("films");

            entity.HasIndex(e => e.Director, "Director");

            entity.Property(e => e.AgeCertificates).HasColumnType("int(2)");
            entity.Property(e => e.Genre).HasMaxLength(16);
            entity.Property(e => e.Length).HasColumnType("int(4)");
            entity.Property(e => e.Name).HasMaxLength(40);
            entity.Property(e => e.ReleaseYear).HasColumnType("date");
            entity.Property(e => e.Summary).HasColumnType("text");

            entity.HasOne(d => d.DirectorNavigation).WithMany(p => p.Films)
                .HasForeignKey(d => d.Director)
                .HasConstraintName("films_ibfk_1");

            entity.HasMany(d => d.Actors).WithMany(p => p.Films)
                .UsingEntity<Dictionary<string, object>>(
                    "Filmactor",
                    r => r.HasOne<Actor>().WithMany()
                        .HasForeignKey("ActorId")
                        .HasConstraintName("filmactor_ibfk_2"),
                    l => l.HasOne<Film>().WithMany()
                        .HasForeignKey("FilmId")
                        .HasConstraintName("filmactor_ibfk_1"),
                    j =>
                    {
                        j.HasKey("FilmId", "ActorId").HasName("PRIMARY");
                        j.ToTable("filmactor");
                        j.HasIndex(new[] { "ActorId" }, "ActorId");
                    });
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("rating");

            entity.HasIndex(e => new { e.FilmId, e.UserId }, "FilmId");

            entity.HasIndex(e => e.UserId, "UserId");

            entity.Property(e => e.Review).HasColumnType("int(11)");

            entity.HasOne(d => d.Film).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.FilmId)
                .HasConstraintName("rating_ibfk_1");

            entity.HasOne(d => d.User).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("rating_ibfk_2");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.Id).HasColumnType("int(10)");
            entity.Property(e => e.Description).HasMaxLength(40);
            entity.Property(e => e.Name).HasMaxLength(10);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Name, "Email").IsUnique();

            entity.HasIndex(e => e.Role, "Role");

            entity.Property(e => e.Email).HasMaxLength(40);
            entity.Property(e => e.Joined)
                .HasDefaultValueSql("'current_timestamp()'")
                .HasColumnType("date");
            entity.Property(e => e.Name).HasMaxLength(40);
            entity.Property(e => e.Role).HasColumnType("int(10)");
            entity.Property(e => e.Sex).HasColumnType("enum('Male','Female')");

            entity.HasOne(d => d.RoleNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.Role)
                .HasConstraintName("user_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
