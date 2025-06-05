using ContactManager.Models;

namespace ContactManager.Services
{
    // Interface that defines business operations on contacts
    public interface IContactService
    {
        List<Contact> GetAll();
        Contact? GetById(Guid id);
        void Add(Contact contact);
        bool Update(Contact contact);
        void Delete(Guid id);
        List<Contact> Search(string term);
    }
}
