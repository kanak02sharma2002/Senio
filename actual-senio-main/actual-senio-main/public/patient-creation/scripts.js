document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("patientForm");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const patientData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/patients", {
        // Adjusted URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error("Failed to add patient");
      }

      alert("Patient added successfully");
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add patient");
    }
  });
});
