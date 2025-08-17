using Microsoft.EntityFrameworkCore;
using SprintBoard.Api.Models;

namespace SprintBoard.Api.Data;

public class SprintBoardContext : DbContext
{
  public SprintBoardContext(DbContextOptions<SprintBoardContext> options)
      : base(options) { }

  public DbSet<TaskItem> Tasks => Set<TaskItem>();
}
