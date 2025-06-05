# Contact Manager

A simple Contact Manager web application built with ASP.NET Core MVC.  
It supports adding, editing, deleting, and searching contacts with client-side and server-side validation.

---

## Features

- Add new contacts with validation (name, email, phone)
- Edit existing contacts
- Delete contacts
- Search contacts by name or email (case-insensitive)
- Responsive and modern UI with Bootstrap and custom styling
- Toast notifications for success and error feedback
- Modal dialogs for Add/Edit actions
- Unit tests for core business logic using NUnit

---

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/YourUsername/ContactManager.git
   cd ContactManager
## 2. Assumptions & Trade-offs

- **In-memory Data Storage:**  
  This application uses an in-memory list to store contacts, which means all data will be lost when the application restarts. I hardcoded 3 sample contacts for easier testing. This approach was chosen for simplicity and demonstration purposes. In a production scenario, a persistent database (e.g., SQL Server, SQLite) should be implemented.

- **Validation:**  
  Both client-side (JavaScript) and server-side (C#) validations are included to provide a better user experience and improve security. However, client-side validation can be bypassed, so server-side validation is the ultimate gatekeeper.

- **UI Framework:**  
  The project uses Bootstrap 5 for styling and layout, alongside Bootstrap Icons for button icons. This choice enables a modern, responsive design with minimal custom CSS.

- **Search Functionality:**  
  The search feature filters contacts by name or email, performing case-insensitive matching. The search input can be cleared to reset the contact list.

- **Unit Testing Scope:**  
  Unit tests cover core business logic within the `ContactService` class. UI and controller tests were omitted to focus on critical functionality within the time constraints.

- **Simplified Authentication:**  
  No authentication or authorization mechanisms are implemented, assuming single-user access for demonstration only.

---

## 3. Possible Issues & Limitations

- **No Persistent Storage:**  
  Since the data lives only in memory, all contact information is lost if the app shuts down or restarts (except of hardcoded 3 records).

- **Concurrency and Multi-user Limitations:**  
  The application does not support concurrent users or data synchronization. It is designed as a single-user demo.

- **Basic Email Validation:**  
  Email validation uses a simple regex or string checks which may not cover all valid email formats, potentially allowing some invalid addresses.

- **Limited Error Handling:**  
  Errors are surfaced via toast notifications, but there is no advanced logging or error recovery.

---

## 4. Future Improvements

- **Implement Persistent Database:**  
  Replace the in-memory store with a database like SQL Server or SQLite to retain data between sessions.

- **Add User Authentication:**  
  Include login and role-based authorization to control access to contacts.

- **Improve Validation:**  
  Enhance validation rules, especially for emails and phone numbers, possibly with third-party libraries.

- **Enhance UI/UX:**  
  Add pagination, sorting, and better accessibility features.

---

## 5. License

This project is licensed under the MIT License. See the (LICENSE) file for details.

---

## 6. Contact & Contribution

Feel free to open issues or submit pull requests if you have suggestions or improvements.

---

