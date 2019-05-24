// loading contacts from localstorage
window.onload = function() {
    const contactsList = JSON.parse(localStorage.getItem(ContactsLocalKey));
    if (contactsList) {
    	contactsList.forEach(function(it, i, arr){
    		addRow(arr[i], i);
    	});
    }
}

const ContactsLocalKey = "contactsList";
const form = document.querySelector("#addingForm");

form.onsubmit = function(ev) {
    ev.preventDefault();

    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;

    let contact = {
    	name,
      	phone
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

function deleteContact(btn) {
    let tr = btn.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
    let itemId = tr.id;

    const contactsList = JSON.parse(localStorage.getItem(ContactsLocalKey));
    contactsList.splice(itemId, 1);

    localStorage.setItem(ContactsLocalKey, JSON.stringify(contactsList));
}

// take button for event
let del = document.querySelector('#deleteAll');
del.addEventListener('click', deleteAllContacts);

function deleteAllContacts(btn) {
	const table = document.querySelector('table');
	let contactsList = JSON.parse(localStorage.getItem(ContactsLocalKey));

	for (let i = contactsList.length; i > 0; i--) {
		table.deleteRow(i);
	}

	localStorage.clear();

}

function editContact(btn) {
	// change btn for save
	var td = btn.parentNode;
	td.innerHTML = '<button id="save" onclick="saveContact(this)">Save</button>';
	
	let tr = td.parentNode;
	var td = tr.querySelectorAll('td');

	//make to inputs
	td[0].innerHTML = '<input id="name" type="text" value="'+td[0].innerHTML+'">'
	td[1].innerHTML = '<input id="phone" type="text" value="'+td[1].innerHTML+'">';
} 

function saveContact(btn) {
	// change btn for edit
	var td = btn.parentNode;
	td.innerHTML = '<button id="edit" onclick="editContact(this)">Edit</button>';

	let tr = td.parentNode;
	var td = tr.querySelectorAll('td');

	// get new contacts
	const newName = td[0].querySelector('input#name').value;
	const newPhone = td[1].querySelector('input#phone').value;

	// remove inputs
	td[0].innerHTML = newName;
	td[1].innerHTML = newPhone;

	let contact = {
		name: newName,
	    phone: newPhone
	};

	const contactsList = JSON.parse(localStorage.getItem(ContactsLocalKey));

	// rewrite array
	const itemId = tr.id;  
	contactsList[itemId] = contact;

	// add element to localStorage
	localStorage.setItem(ContactsLocalKey, JSON.stringify(contactsList));
}

// add row to table
function addRow(contact, id) {
	let table = document.querySelector("#contactsTable");
	let row = table.insertRow();
	row.id = id;
	// let { insertCell } = row;

	let nameCell = row.insertCell();
	nameCell.innerHTML = contact.name;

	let phoneCell = row.insertCell();
	phoneCell.innerHTML = contact.phone;

	let editCell = row.insertCell();
	editCell.innerHTML = '<button id="edit" onclick="editContact(this)">Edit</button>';

	let deleteCell = row.insertCell();
	deleteCell.innerHTML = '<button id="del" onclick="deleteContact(this)">Delete</button>';
}