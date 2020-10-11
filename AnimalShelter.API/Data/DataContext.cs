using AnimalShelter.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AnimalShelter.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, 
        UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<Photo> Photos { get; set; }  
        public DbSet<Animal> Animals { get; set; }  
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Save> Saves { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<UserPhoto> UserPhotos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole => 
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            builder.Entity<Save>()
                .HasKey(k => new {k.SaverId, k.SaveeId});

            builder.Entity<Save>()
                .HasOne(u => u.Savee)
                .WithMany(a => a.Savers)
                .HasForeignKey(u => u.SaveeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Save>()
                .HasOne(u => u.Saver)
                .WithMany(a => a.Savees)
                .HasForeignKey(u => u.SaverId)
                .OnDelete(DeleteBehavior.Restrict);
            
            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);
            
            builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesRecieved)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}