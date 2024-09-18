$(document).ready(function () {
  fetchTopPatients();

  function fetchTopPatients() {
    $.get("/api/patients/top-patients", function (patients) {
      displayPatients(patients);
    }).fail(function () {
      console.error("Error fetching top patients");
    });
  }

  function displayPatients(patients) {
    const patientContainer = $("#patient-container");
    patientContainer.empty();

    patients.forEach((patient) => {
      const patientBlock = $("<div>", {
        class: `patient-block ${patient.severity.toLowerCase()}`,
      });

      const patientLevel = $("<div>", {
        class: `patient-level ${patient.severity.toLowerCase()}`,
        text: patient.severity[0],
      });

      patientBlock.append(patientLevel);

      const patientOverlay = $("<div>", {
        class: "patient-overlay",
      });

      const patientInfo = $("<div>", {
        class: "patient-info",
      });

      const patientName = $("<p>", {
        class: "patient-name",
        text: patient.name,
      });

      const patientAge = $("<p>", {
        text: `Age: ${patient.age}`,
      });

      const patientGender = $("<p>", {
        text: `Gender: ${patient.gender}`,
      });

      const patientCondition = $("<p>", {
        text: `Condition: ${patient.condition}`,
      });

      patientInfo.append(
        patientName,
        patientAge,
        patientGender,
        patientCondition
      );
      patientOverlay.append(patientInfo);
      patientBlock.append(patientOverlay);
      patientContainer.append(patientBlock);
    });
  }
});
