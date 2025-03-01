// Function to fetch and display all patients
async function getAllPatients() {
  try {
    const response = await fetch("/api/patients");
    if (!response.ok) {
      throw new Error("Failed to fetch patients");
    }
    const patients = await response.json();
    displayPatients(patients);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch patients");
  }
}

// Function to display patients
function displayPatients(patients) {
  const patientList = document.getElementById("patientList");
  patientList.innerHTML = "";
  patients.forEach((patient) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
          <span>${patient.name} - ${patient.age} years - ${patient.gender}</span>
          <span>${patient.condition}</span>
          <button onclick="editPatient('${patient._id}')">Edit</button>
          <button onclick="deletePatient('${patient._id}')">Delete</button>
      `;
    patientList.appendChild(listItem);
  });
}

// Function to search patients
async function searchPatients() {
  const query = document.getElementById("searchInput").value;
  try {
    const response = await fetch(`/api/patients/search?query=${query}`);
    if (!response.ok) {
      throw new Error("Failed to search patients");
    }
    const patients = await response.json();
    displayPatients(patients);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to search patients");
  }
}

// Function to filter patients
async function filterPatients() {
  const property = document.getElementById("filterProperty").value;
  const value = document.getElementById("filterValue").value;
  try {
    const response = await fetch(
      `/api/patients/filter?property=${property}&value=${value}`
    );
    if (!response.ok) {
      throw new Error("Failed to filter patients");
    }
    const patients = await response.json();
    displayPatients(patients);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to filter patients");
  }
}

// Function to edit patient
async function editPatient(id) {
  try {
    // Fetch the patient details using the ID
    const response = await fetch(`/api/patients/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch patient details");
    }
    const patient = await response.json();

    // Fill the edit form with the patient details
    document.getElementById("editName").value = patient.name;
    document.getElementById("editAge").value = patient.age;
    document.getElementById("editGender").value = patient.gender;
    document.getElementById("editCondition").value = patient.condition;

    // Show the edit form or modal
    document.getElementById("editForm").style.display = "block";
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to edit patient");
  }
}

// Function to delete patient
async function deletePatient(id) {
  if (confirm("Are you sure you want to delete this patient?")) {
    try {
      const response = await fetch(`/api/patients/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }
      // Refresh patient list after deletion
      getAllPatients();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete patient");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Initial fetch of all patients
  getAllPatients();
});
