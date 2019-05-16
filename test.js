// loading contacts from localstorage
window.onload = function() {
    let contactsList = JSON.parse(localStorage.getItem(ContactsLocalKey));
    if (contactsList != null) {
	    for (let i = 0; i < contactsList.length; i++) {
	    	addRow(contactsList[i], i);
	    }
    }
}

const ContactsLocalKey = "contactsList";
var form = document.querySelector("form#addingForm");

form.onsubmit = function(ev) {
    ev.preventDefault();

    let name = document.querySelector('input#name').value;
    let phone = document.querySelector('input#phone').value;

    let contact = {
    	name: name,
      phone: phone
    };

    let contactsList = JSON.parse(localStorage.getItem(ContactsLocalKey));
    if (contactsList == null) {
    	contactsList = [];
    }
    contactsList.push(contact);

    // add element to table
    addRow(contact, contactsList.length - 1);

    // add element to localStorage
    localStorage.setItem(ContactsLocalKey, JSON.stringify(contactsList));
}

function removeContact(btn) {
    var tr = btn.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
    let itemId = tr.id;

    let contactsList = JSON.parse(localStorage.getItem(ContactsLocalKey));
    contactsList.splice(itemId, 1);

    localStorage.setItem(ContactsLocalKey, JSON.stringify(contactsList));
}

function deleteAllContacts(btn) {
	var table = document.querySelector('table');
	let contactsList = JSON.parse(localStorage.getItem(ContactsLocalKey));

	for (let i = contactsList.length; i > 0; i--) {
		table.deleteRow(i);
	}

	localStorage.clear();

}

function editContact(btn) {
	// change button for save
	btn.style.display = 'none';
	var td = btn.parentNode;
	td.innerHTML = '<button id="save" onclick="saveContact(this)">save</button>';
	
	var tr = td.parentNode;
	var td = tr.querySelectorAll('td');

	//make to inputs
	td[0].innerHTML = '<input id="name" type="text" value="'+td[0].innerHTML+'">'
	td[1].innerHTML = '<input id="phone" type="text" value="'+td[1].innerHTML+'">';
} 

function saveContact(btn) {
	// change button for edit 
	btn.style.display = 'none';
	var td = btn.parentNode;
	td.innerHTML = '<button id="edit" onclick="editContact(this)">edit</button>';

	var tr = td.parentNode;
	var td = tr.querySelectorAll('td');

	// get new contacts
	let newName = td[0].querySelector('input#name').value;
	let newPhone = td[1].querySelector('input#phone').value;

	// remove inputs
	td[0].innerHTML = newName;
	td[1].innerHTML = newPhone;

	let contact = {
		name: newName,
	    phone: newPhone
	};

	let contactsList = JSON.parse(localStorage.getItem(ContactsLocalKey));

	// rewrite array
	let itemId = tr.id;  
	contactsList[itemId] = contact;

	// add element to localStorage
	localStorage.setItem(ContactsLocalKey, JSON.stringify(contactsList));
}


// add row to table
function addRow(contact, id) {
	let table = document.querySelector("#contactsTable");
	let row = table.insertRow();
	row.id = id;
	
	let nameCell = row.insertCell();
	nameCell.innerHTML = contact.name;

	let phoneCell = row.insertCell();
	phoneCell.innerHTML = contact.phone;

	let editCell = row.insertCell();
	editCell.innerHTML = '<button id="edit" onclick="editContact(this)">edit</button>';

	let deleteCell = row.insertCell();
	deleteCell.innerHTML = '<button id="del" onclick="removeContact(this)">delete</button>';
}