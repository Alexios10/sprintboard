using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SprintBoard.Api.Data;
using SprintBoard.Api.Models;

namespace SprintBoard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
  private readonly SprintBoardContext _context;

  public TasksController(SprintBoardContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
  {
    return await _context.Tasks.ToListAsync();
  }

  [HttpPost]
  public async Task<ActionResult<TaskItem>> CreateTask(TaskItem task)
  {
    _context.Tasks.Add(task);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateTask(int id, TaskItem task)
  {
    if (id != task.Id) return BadRequest();

    _context.Entry(task).State = EntityState.Modified;
    await _context.SaveChangesAsync();
    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteTask(int id)
  {
    var task = await _context.Tasks.FindAsync(id);
    if (task == null) return NotFound();

    _context.Tasks.Remove(task);
    await _context.SaveChangesAsync();
    return NoContent();
  }
}
