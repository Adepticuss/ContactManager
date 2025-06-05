using ContactManager.Models;
using ContactManager.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactManager.Controllers
{
    public class ContactController : Controller
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }


        // GET: /Contact
        // Loads the main page with all contacts
        public IActionResult Index()
        {
            // Get all contacts from service and pass to view
            var contacts = _contactService.GetAll();
            return View(contacts);
        }

        // POST: /Contact/Create
        // AJAX endpoint to add a new contact
        [HttpPost]
        public IActionResult Create([FromBody] Contact contact)
        {
            // Check if model is valid
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Add contact using service
            _contactService.Add(contact);

            // Return success response
            return Ok();
        }

        // POST: /Contact/Edit
        // AJAX endpoint to update an existing contact
        [HttpPost]
        public IActionResult Edit([FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = _contactService.Update(contact);
            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }

        // POST: /Contact/Delete
        // AJAX endpoint to delete a contact by ID
        [HttpPost]
        public IActionResult Delete([FromBody] Guid id)
        {
            _contactService.Delete(id);
            return Ok(new { message = "Contact deleted successfully." });
        }

        // GET: /Contact/Search?term=abc
        // AJAX endpoint to search contacts by name/email
        [HttpGet]
        public IActionResult Search(string term)
        {
            var results = _contactService.Search(term);
            return Json(results);
        }
    }
}
