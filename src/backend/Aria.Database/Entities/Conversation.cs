using System;
using System.Collections.Generic;

namespace Aria.Database.Entities;

public partial class Conversation
{
    public long Id { get; set; }

    public byte[]? CreatedAt { get; set; }

    public virtual ICollection<ConversationUser> ConversationUsers { get; set; } = new List<ConversationUser>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
}
