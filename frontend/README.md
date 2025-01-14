try {
      const response = await axios.post("/api/request-adopt", { petId });
      alert(`Adoption request sent successfully for pet ID: ${petId}`);
    } catch (error) {
      console.error("Error sending adoption request:", error);
      alert("Failed to send adoption request. Please try again.");
    }