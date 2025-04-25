document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".php-email-form");
  const loading = document.querySelector(".loading");
  const errorMessage = document.querySelector(".error-message");
  const sentMessage = document.querySelector(".sent-message");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Show loading indicator
    loading.style.display = "block";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";

    const formData = new FormData(form);

    try {
      const response = await fetch("forms/contact.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire.");
      }

      const result = await response.text();

      if (result.trim() === "OK") {
        // Show success message
        sentMessage.style.display = "block";
        form.reset();
      } else {
        throw new Error(result || "Erreur inconnue.");
      }
    } catch (error) {
      // Show error message
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
    } finally {
      // Hide loading indicator
      loading.style.display = "none";
    }
  });
});