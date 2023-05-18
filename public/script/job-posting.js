// Handle job posting form submission
function postJob(button) {
    const explanation = document.getElementById('explanation').value;
    const wage = document.getElementById('wage').value;
    const userId = button.dataset.user;
  
    // Create an object with the form data
    const formData = {
      jobDescription: explanation,
      hourlyWage: wage
    };
  
    // Send a POST request to the server with the form data
    fetch('/api/posting/job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          // Redirect to the desired page after successful job posting
          window.location.href = '/';
        } else {
          throw new Error('Error creating job posting');
        }
      })
      .catch(error => {
        console.error(error);
        // Handle the error as needed
      });
  }
  
  // Fetch and display job postings
  function getJobPostings() {
    // Send a GET request to the server to fetch job postings
    fetch('/api/posting/job-postings')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching job postings');
        }
      })
      .then(data => {
        // Render job postings on the page
        renderJobPostings(data.jobPostings);
      })
      .catch(error => {
        console.error(error);
        // Handle the error as needed
      });
  }
  
  // Render job postings on the page
  function renderJobPostings(jobPostings) {
    const container = document.querySelector('.white-container');
  
    if (jobPostings.length > 0) {
      // Clear existing job postings
      container.innerHTML = '';
  
      // Create HTML elements for each job posting and append them to the container
      jobPostings.forEach(jobPosting => {
        const jobElement = document.createElement('div');
        jobElement.innerHTML = `
          <h3>${jobPosting.user.firstName} ${jobPosting.user.lastName}</h3>
          <p>Job Description: ${jobPosting.jobDescription}</p>
          <p>Hourly Wage: ${jobPosting.hourlyWage}</p>
        `;
        container.appendChild(jobElement);
      });
    } else {
      // Display a message when no job postings are available
      container.innerHTML = '<p>No postings found.</p>';
    }
  }
  
  // Call the getJobPostings function to fetch and display job postings when the page loads
  getJobPostings();
  
  