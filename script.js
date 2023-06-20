const addButton = document.getElementById('addButton');
const dialog = document.getElementById('dialog');
const jobForm = document.getElementById('jobForm');
const jobList = document.getElementById('jobList');

addButton.addEventListener('click', () => {
  dialog.classList.remove('hidden');
});

jobForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const companyName = document.getElementById('companyName').value;
  const role = document.getElementById('role').value;
  const workingHours = document.getElementById('workingHours').value;
  const salary = document.getElementById('salary').value;

  const jobDetails = {
    companyName,
    role,
    workingHours,
    salary
  };

  // Send the job details to the server using an HTTP request (e.g., fetch or Axios)
  // After receiving a successful response, you can add the job details to the job list on the page

  const jobItem = document.createElement('div');
  jobItem.innerHTML = `
    <h3>${companyName}</h3>
    <p>Role: ${role}</p>
    <p>Working Hours: ${workingHours}</p>
    <p>Salary: ${salary}</p>
  `;

  jobList.appendChild(jobItem);

  dialog.classList.add('hidden');
  jobForm.reset();
});
