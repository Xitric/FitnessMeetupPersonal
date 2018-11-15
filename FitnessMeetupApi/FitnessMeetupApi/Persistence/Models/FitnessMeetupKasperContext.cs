using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FitnessMeetupApi.Persistence.Models
{
    public partial class FitnessMeetupKasperContext : DbContext
    {
        public FitnessMeetupKasperContext()
        {
        }

        public FitnessMeetupKasperContext(DbContextOptions<FitnessMeetupKasperContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Meetup> Meetup { get; set; }
        public virtual DbSet<Participant> Participant { get; set; }
        public virtual DbSet<Sport> Sport { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=fitnessmeetupkasper.database.windows.net;Database=FitnessMeetupKasper;Trusted_Connection=False;User ID=FitnessAdmin;Password=95rEME5N^*DY8my");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Meetup>(entity =>
            {
                entity.Property(e => e.MeetupId).HasColumnName("meetupId");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(2048)
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasColumnName("location")
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Owner).HasColumnName("owner");

                entity.Property(e => e.Sport)
                    .HasColumnName("sport")
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasMaxLength(128)
                    .IsUnicode(false);

                entity.HasOne(d => d.OwnerNavigation)
                    .WithMany(p => p.Meetup)
                    .HasForeignKey(d => d.Owner)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Meetup_User_userId_fk");

                entity.HasOne(d => d.SportNavigation)
                    .WithMany(p => p.Meetup)
                    .HasForeignKey(d => d.Sport)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("Meetup_Sport_name_fk");
            });

            modelBuilder.Entity<Participant>(entity =>
            {
                entity.HasKey(e => new { e.MeetupId, e.UserId });

                entity.Property(e => e.MeetupId).HasColumnName("meetupId");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.Meetup)
                    .WithMany(p => p.Participant)
                    .HasForeignKey(d => d.MeetupId)
                    .HasConstraintName("Participant_Meetup_meetupId_fk");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Participant)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("Participant_User_userId_fk");
            });

            modelBuilder.Entity<Sport>(entity =>
            {
                entity.HasKey(e => e.Name);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(32)
                    .IsUnicode(false)
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId)
                    .HasColumnName("userId")
                    .ValueGeneratedNever();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(96)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(96)
                    .IsUnicode(false);
            });
        }
    }
}
