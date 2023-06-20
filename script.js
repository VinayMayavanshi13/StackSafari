// Add your combined JavaScript code here
const addJobButton = document.getElementById("addJobButton");
const addJobModal = document.getElementById("addJobModal");
const closeButton = document.querySelector(".close");
const addJobForm = document.getElementById("addJobForm");
//http://localhost:3000
const BASE_URL = "file:///C:/Users/Vinay/OneDrive/Desktop/Sample-Fullstack/index.html"; // Update with your server URL

addJobButton.addEventListener("click", () => {
  addJobModal.style.display = "block";
});

closeButton.addEventListener("click", () => {
  addJobModal.style.display = "none";
});

addJobForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const companyName = document.getElementById("companyName").value;
  const position = document.getElementById("position").value;
  const workingHours = document.getElementById("workingHours").value;
  const compensation = document.getElementById("compensation").value;

  const jobData = {
    companyName,
    position,
    workingHours,
    compensation,
  };

  try {
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      throw new Error("Failed to add job");
    }

    const data = await response.json();
    console.log("Job added:", data);

    // Clear the form inputs
    document.getElementById("companyName").value = "";
    document.getElementById("position").value = "";
    document.getElementById("workingHours").value = "";
    document.getElementById("compensation").value = "";

    // Close the modal
    addJobModal.style.display = "none";

    // Fetch and display the updated job listings
    fetchJobListings();
  } catch (error) {
    console.error("Error adding job:", error);
    // Handle error if necessary
  }
});

// Fetch job listings and display them on the page
async function fetchJobListings() {
  try {
    const response = await fetch(`${BASE_URL}/jobs`);

    if (!response.ok) {
      throw new Error("Failed to fetch job listings");
    }

    const jobListings = await response.json();
    console.log("Job listings:", jobListings);

    // Clear the existing job listings on the page
    const jobListingsContainer = document.getElementById("jobListings");
    jobListingsContainer.innerHTML = "";

    // Display job listings on the page
    jobListings.forEach((job) => {
      const jobListingElement = document.createElement("div");
      jobListingElement.innerHTML = `
        <h3>${job.companyName}</h3>
        <p>Position: ${job.position}</p>
        <p>Working Hours: ${job.workingHours}</p>
        <p>Compensation: ${job.compensation}</p>
      `;
      jobListingsContainer.appendChild(jobListingElement);
    });
  } catch (error) {
    console.error("Error fetching job listings:", error);
    // Handle error if necessary
  }
}

// Fetch job listings when the page loads
window.addEventListener("load", fetchJobListings);
