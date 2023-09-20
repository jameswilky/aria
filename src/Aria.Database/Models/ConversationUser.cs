using System;
using System.Collections.Generic;

namespace Aria.Database.Models;

public partial class ConversationUser
{
    public long Id { get; set; }

    public long? ConversationId { get; set; }

    public long? UserId { get; set; }

    public virtual Conversation? Conversation { get; set; }

    public virtual User? User { get; set; }
}
