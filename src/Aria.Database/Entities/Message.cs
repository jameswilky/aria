using System;
using System.Collections.Generic;

namespace Aria.Database.Entities;

public partial class Message
{
    public long Id { get; set; }

    public long? ConversationId { get; set; }

    public long? AuthorId { get; set; }

    public string? Content { get; set; }

    public byte[]? Timestamp { get; set; }

    public virtual User? Author { get; set; }

    public virtual Conversation? Conversation { get; set; }
}
