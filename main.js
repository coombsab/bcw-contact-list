let contacts = []
loadContacts()



/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  
  event.preventDefault()  //Prevents the page load after submit
  //document.getElementById("new-contact-form").classList.add("hidden")

  let form = event.target
  let name = form.name.value
  let phone = form.phone.value
  let emergencyContact = form.emergencyContact.checked
  let newID = generateId()
  let formattedPhone = ""
  if (phone !== "") {
    formattedPhone = "(" + phone.slice(0,3) + ") " + phone.slice(3,6) + "-" + phone.slice(6,phone.length)
  }
  let newContact = {
    id: newID,
    name: name,
    phone: formattedPhone,
    emergencyContact: emergencyContact
  }

  contacts.push(newContact)
  document.getElementById("new-contact-form").classList.add("hidden")

  saveContacts()
  form.reset()
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let contactsData = JSON.parse(window.localStorage.getItem("contacts"))
  if (contactsData) {
    contacts = contactsData
  }
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let template = ""

  contacts.sort(function(a, b) {
    let textA = a.name.toUpperCase()
    let textB = b.name.toUpperCase()
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
  })

  contacts.forEach(contact => {
    template+= `
      <div id=${contact.id} class="card mt-1 mb-1 ${contact.emergencyContact ? 'emergency-contact' : ''}">
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
            <span>${contact.phone}</span>
          </p>
          <i id="delete-icon" class="action fa fa-trash text-danger" onclick="removeContact('${contact.id}')"></i>
        </div>
      </div>
    `
  })

  //@ts-ignore
  document.getElementById("contact-list").innerHTML = template
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id === contactId)
  if (index === -1) {
    throw new Error("Invalid Contact ID")
  }
  contacts.splice(index, 1)
  saveContacts()
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  document.getElementById("new-contact-form").classList.toggle("hidden")
  document.getElementById("name-input").focus()

}

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadContacts()
drawContacts()