namespace SprintBoard.Models
{
  public class Card
  {
    public int Id { get; set; }            // Primærnøkkel
    public string Title { get; set; } = ""; // Oppgavetekst
    public string? Description { get; set; } // Valgfri beskrivelse
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Når kortet ble laget
  }
}
