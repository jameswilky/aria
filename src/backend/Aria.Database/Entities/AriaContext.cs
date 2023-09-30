using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Aria.Database.Entities;

public partial class AriaContext : DbContext
{
    public AriaContext()
    {
    }

    public AriaContext(DbContextOptions<AriaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Conversation> Conversations { get; set; }

    public virtual DbSet<ConversationUser> ConversationUsers { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite("Data Source=../Aria.Database/aria.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Conversation>(entity =>
        {
            entity.ToTable("conversations");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("DATETIME")
                .HasColumnName("created_at");
        });

        modelBuilder.Entity<ConversationUser>(entity =>
        {
            entity.ToTable("conversation_users");

            entity.HasIndex(e => new { e.ConversationId, e.UserId }, "IX_conversation_users_conversation_id_user_id").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ConversationId).HasColumnName("conversation_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Conversation).WithMany(p => p.ConversationUsers).HasForeignKey(d => d.ConversationId);

            entity.HasOne(d => d.User).WithMany(p => p.ConversationUsers).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.ToTable("messages");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AuthorId).HasColumnName("author_id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.ConversationId).HasColumnName("conversation_id");
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("DATETIME")
                .HasColumnName("timestamp");

            entity.HasOne(d => d.Author).WithMany(p => p.Messages).HasForeignKey(d => d.AuthorId);

            entity.HasOne(d => d.Conversation).WithMany(p => p.Messages).HasForeignKey(d => d.ConversationId);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "IX_users_email").IsUnique();

            entity.HasIndex(e => e.Username, "IX_users_username").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.HashedPassword).HasColumnName("hashed_password");
            entity.Property(e => e.Username).HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
