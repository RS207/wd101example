const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

const userForm = document.getElementById("user-form");
let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`;

        const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = document.querySelector(".table-container table");
    table.innerHTML = `<tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Dob</th>
                        <th>Accepted terms?</th>
                      </tr>${tableEntries}`;
};

const saveUserForm = (event) => {
    event.preventDefault();

    const acceptTermsCheckbox = document.getElementById('acceptTerms');
    const acceptTermsError = document.getElementById('acceptTermsError');

    // Validate checkbox
    if (!acceptTermsCheckbox.checked) {
        acceptTermsError.textContent = 'Please accept the terms and conditions.';
        return; // Exit the function if checkbox is not checked
    } else {
        acceptTermsError.textContent = '';
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndconditions = acceptTermsCheckbox.checked;
    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndconditions
    };
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
    userForm.reset(); // Reset the form fields after submission
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();

const acceptTermsCheckbox = document.getElementById('acceptTerms');
const acceptTermsError = document.getElementById('acceptTermsError');
const dobInput = document.getElementById('dob');
const dobError = document.getElementById('dobError');

// Event listener for checkbox change
acceptTermsCheckbox.addEventListener('change', function () {
    // Clear the error message when the checkbox is checked
    acceptTermsError.textContent = '';
});

// Event listener for date input change
dobInput.addEventListener('input', function () {
    validateDOB();
});

// Event listener for form submission
document.getElementById('user-form').addEventListener('submit', function (event) {
    // Validate date of birth before submitting the form
    if (!validateDOB()) {
        event.preventDefault();
    }
});

// Function to validate date of birth
function validateDOB() {
    const dobValue = dobInput.value;
    const dobDate = new Date(dobValue);
    const currentDate = new Date();
    const minAgeDate = new Date(currentDate);
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 55);
    const maxAgeDate = new Date(currentDate);
    maxAgeDate.setFullYear(maxAgeDate.getFullYear() - 18);

    if (dobDate < minAgeDate || dobDate > maxAgeDate) {
        dobError.textContent = 'Please enter a valid date of birth between 18 and 55 years.';
        return false;
    } else {
        dobError.textContent = '';
        return true;
    }
}
