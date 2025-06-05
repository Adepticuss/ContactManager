using System.ComponentModel.DataAnnotations;

namespace ContactManager.Models
{
    public class Contact
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required(ErrorMessage = "Name is required.")]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters.")]
        [MaxLength(12, ErrorMessage = "Name cannot be longer than 12 characters.")]
        public string Name { get; set; }

        // Contact's email, must be a valid email format
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }

        // Contact's phone number, required field
        [Required(ErrorMessage = "Phone is required.")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be exactly 10 digits.")]
        public string Phone { get; set; }
    }
}
