using AnimalShelter.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AnimalShelter.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }  
        public DbSet<Animal> Animals { get; set; }  
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Save> Saves { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
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