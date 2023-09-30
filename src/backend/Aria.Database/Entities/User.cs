using System;
using System.Collections.Generic;

namespace Aria.Database.Entities;

public partial class User
{
    public long Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string HashedPassword { get; set; } = null!;

    public virtual ICollection<ConversationUser> ConversationUsers { get; set; } = new List<ConversationUser>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
}
