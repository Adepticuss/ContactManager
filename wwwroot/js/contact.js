// Utility to reload contact list (after add/edit/delete)
function loadContacts() {
    $.get('/Contact', function (html) {
        const body = $(html).find('#contactTableBody').html();

        // replace current table content
        $('#contactTableBody').html(body); 
    });
}

// Show Add Contact Modal
function showAddModal() {
    const modalHtml = `
    <div class="modal fade" id="contactModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content custom-modal">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Add Contact</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input id="name" type="text" class="form-control mb-2" name="name" placeholder="Name" />
            <input id="email" type="email" class="form-control mb-2" name="email" placeholder="Email" />
            <input id="phone" type="text" class="form-control mb-2" name="phone" placeholder="Phone" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">
              <i class="bi bi-x-circle me-1"></i> Cancel
            </button>
            <button class="btn btn-outline-primary" onclick="addContact()">
              <i class="bi bi-plus-circle me-1"></i> Add
            </button>
          </div>
        </div>
      </div>
    </div>`;
    $('#contactModalContainer').html(modalHtml);
    new bootstrap.Modal(document.getElementById('contactModal')).show();
}

// AJAX call to add contact
function addContact() {
    const contact = {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val()
    };

    $.ajax({
        url: '/Contact/Create',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(contact),
        success: function () {
            bootstrap.Modal.getInstance(document.getElementById('contactModal')).hide();
            loadContacts(); // Refresh the contact list
            showToast("Success", "Contact added successfully", "success");

            $('#name, #email, #phone').val('').removeClass('is-invalid').tooltip('dispose');
        },
        error: function (xhr) {
            if (xhr.status === 400 && xhr.responseJSON) {
                let errors = xhr.responseJSON;

                // Clear any previous state
                $('.form-control').removeClass('is-invalid').removeAttr('data-bs-toggle title').tooltip('dispose');

                // Highlight and add tooltips
                for (let key in errors) {
                    let $input = $(`#${key.toLowerCase()}`);
                    $input.addClass('is-invalid');
                    $input.attr('data-bs-toggle', 'tooltip');
                    $input.attr('title', errors[key][0]);
                    new bootstrap.Tooltip($input[0]);
                }

                // Show toast
                let messages = Object.values(errors).map(e => e[0]).join('<br>');
                showToast("Validation failed", messages, "danger");
            } else {
                showToast("Error", "Failed to add contact", "danger");
            }
        }
    });
}


// Show Edit Contact Modal (with pre-filled data)
function showEditModal(contactId) {
    const row = $('tr[data-id="' + contactId + '"]');
    const name = row.find('td:eq(0)').text().trim();
    const email = row.find('td:eq(1)').text().trim();
    const phone = row.find('td:eq(2)').text().trim();

    const modalHtml = `
    <div class="modal fade" id="editModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content custom-modal">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Edit Contact</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input id="name" type="text" class="form-control mb-2" name="name" placeholder="Name" value="${name}" />
            <input id="email" type="email" class="form-control mb-2" name="email" placeholder="Email" value="${email}" />
            <input id="phone" type="text" class="form-control mb-2" name="phone" placeholder="Phone" value="${phone}" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">
              <i class="bi bi-x-circle me-1"></i> Cancel
            </button>
            <button class="btn btn-outline-primary" onclick="editContact('${contactId}')">
              <i class="bi bi-pencil-square me-1"></i> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>`;
    $('#contactModalContainer').html(modalHtml);
    new bootstrap.Modal(document.getElementById('editModal')).show();
}



// AJAX call to update contact
function editContact(contactId) {
    const contact = {
        id: contactId,
        name: $('#editModal #name').val(),
        email: $('#editModal #email').val(),
        phone: $('#editModal #phone').val()
    };

    $.ajax({
        url: '/Contact/Edit',
        method: 'POST',
        data: JSON.stringify(contact),
        contentType: 'application/json',
        success: function () {
            bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
            loadContacts();
            showToast("Success", "Contact updated successfully!", "success");

            // Clear any previous validation states
            $('#editModal .form-control')
                .removeClass('is-invalid')
                .removeAttr('data-bs-toggle title')
                .tooltip('dispose');
        },
        error: function (xhr) {
            let errors = {};

            if (xhr.status === 400 && xhr.responseJSON) {
                errors = xhr.responseJSON;

                // Clear existing invalid state
                $('#editModal .form-control')
                    .removeClass('is-invalid')
                    .removeAttr('data-bs-toggle title')
                    .tooltip('dispose');

                // Highlight fields and attach tooltips
                for (let key in errors) {
                    const $input = $(`#editModal #${key.toLowerCase()}`);
                    $input.addClass('is-invalid');
                    $input.attr('data-bs-toggle', 'tooltip');
                    $input.attr('title', errors[key][0]);
                    new bootstrap.Tooltip($input[0]);
                }

                let messages = Object.values(errors).map(e => e[0]).join('<br>');
                showToast("Validation failed", messages, "danger");

            } else if (xhr.status === 404) {
                showToast("Error", "Contact not found.", "danger");
            } else {
                showToast("Error", "Failed to update contact.", "danger");
            }
        }
    });
}


// AJAX call to delete contact
function deleteContact(contactId) {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    $.ajax({
        url: '/Contact/Delete',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(contactId),
        success: function () {
            loadContacts();
            showToast("Delete", "Contact deleted successfully", "danger");
        },
        error: function () {
            alert('Failed to delete contact.');
        }
    });
}

// AJAX call to search contacts
function searchContacts() {
    const term = $('#searchInput').val();
    $.ajax({
        url: '/Contact/Search?term=' + encodeURIComponent(term),
        type: 'GET',
        success: function (results) {
            let html = '';
            results.forEach(contact => {
                html += `
                <tr data-id="${contact.id}">
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.phone}</td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm me-2" onclick="showEditModal('${contact.id}')">
                          <i class="bi bi-pencil-square me-1"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteContact('${contact.id}')">
                          <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
                `;
            });
            $('#contactTableBody').html(html);
        },
        error: function () {
            alert('Search failed.');
        }
    });
}

//Adds a dismissible toast
function showToast(title, message, type = "info") {
    const bgColorClass = {
        success: 'bg-success text-white',
        danger: 'bg-danger text-white',
        info: 'bg-info text-white'
    }[type] || 'bg-info text-white';

    const toastId = `toast-${Date.now()}`;

    const toastHtml = `
    <div id="${toastId}" class="toast align-items-center border-0 show ${bgColorClass}"
         role="alert" aria-live="assertive" aria-atomic="true"
         style="position: fixed; top: 1rem; right: 1rem; min-width: 250px; z-index: 1055;">
      <div class="d-flex">
        <div class="toast-body">
          <strong>${title}</strong><br>${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>`;

    $('#toast-container').remove();
    $('body').append(`<div id="toast-container">${toastHtml}</div>`);

    setTimeout(() => {
        $(`#${toastId}`).fadeOut(400, function () { $(this).remove(); });
    }, 6000);
}


