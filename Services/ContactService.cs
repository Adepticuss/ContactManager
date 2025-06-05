using ContactManager.Models;

namespace ContactManager.Services
{
    public class ContactService : IContactService
    {
        private readonly List<Contact> _contacts = new();

        // Sample records to have some table data (if deleted NUnit test cases should be edited accordingly)
        public ContactService()
        {
            _contacts = new List<Contact>
        {
            new Contact
            {
                Id = Guid.NewGuid(),
                Name = "Alice Johnson",
                Email = "alice.johnson@example.com",
                Phone = "6471234567"
            },
            new Contact
            {
                Id = Guid.NewGuid(),
                Name = "Bob Smith",
                Email = "bob.smith@example.com",
                Phone = "4169876543"
            },
            new Contact
            {
                Id = Guid.NewGuid(),
                Name = "Clara Williams",
                Email = "clara.w@example.com",
                Phone = "9051122334"
            }
        };
        }

        // Returns all contacts
        public List<Contact> GetAll() => _contacts;

        // Gets a contact by its unique ID
        public Contact? GetById(Guid id) => _contacts.FirstOrDefault(c => c.Id == id);

        // Adds a new contact to the list
        public void Add(Contact contact)
        {
            contact.Id = Guid.NewGuid(); 
            _contacts.Add(contact);
        }

        // Updates an existing contact by ID
        public bool Update(Contact contact)
        {
            var existing = _contacts.FirstOrDefault(c => c.Id == contact.Id);
            if (existing == null)
                return false;

            existing.Name = contact.Name;
            existing.Email = contact.Email;
            existing.Phone = contact.Phone;

            return true;
        }

        // Deletes a contact by ID
        public void Delete(Guid id)
        {
            var contact = GetById(id);
            if (contact is not null)
            {
                _contacts.Remove(contact);
            }
        }

        // Searches contacts by name or email
        public List<Contact> Search(string term)
        {
            if (string.IsNullOrWhiteSpace(term))
            {
                return _contacts; // return all contacts if search is empty
            }

            term = term.ToLower();
            return _contacts.Where(c =>
                c.Name != null && c.Name.ToLower().Contains(term) ||
                c.Email != null && c.Email.ToLower().Contains(term)
            ).ToList();
        }

    }
}
