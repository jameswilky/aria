using Aria.Server.DTO.Actions;
using Microsoft.EntityFrameworkCore;

namespace Aria.Server.Models.Errors;

public record Error;
public record UserAlreadyExists(AddUser AddUser, DbUpdateException UpdateException) : Error;