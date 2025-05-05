// Sample workflow data (this would be fetched from n8n API in a real app)
const workflows = [
  { id: 1, name: 'DZ Interns Summary Email AI Agent', status: 'Active', webhookUrl: 'http://localhost:5678/webhook/interns-updates' },
  { id: 2, name: 'Email to Telegram', status: 'Active', webhookUrl: 'http://localhost:5678/webhook/email-telegram' }
];

const workflowListContainer = document.getElementById('workflow-cards');

// Function to create and display workflow cards
function displayWorkflows() {
  workflowListContainer.innerHTML = ''; // Clear any existing content

  workflows.forEach(workflow => {
    const card = document.createElement('div');
    card.classList.add('workflow-card');
    card.innerHTML = `
      <h3>${workflow.name}</h3>
      <p>Status: ${workflow.status}</p>
      <button class="trigger-btn" onclick="triggerWorkflow(${workflow.id})">Trigger</button>
    `;
    workflowListContainer.appendChild(card);
  });
}

// Simulate workflow trigger (this would be an API call in a real app)
async function triggerWorkflow(id) {
  const workflow = workflows.find(w => w.id === id);
  const webhookUrl = workflow.webhookUrl;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `${workflow.name} triggered!` // Customize this based on workflow data
      })
    });

    const result = await response.json();
    console.log('Workflow Output:', result);

    // Show the result in a pop-up message as simple text
    const message = result.status === 'success' 
      ? `${workflow.name} triggered successfully!` 
      : 'Workflow was started.';
      
    alert(message);

  } catch (error) {
    console.error('Error:', error);
    alert('Failed to trigger the workflow.');
  }
}

function openAddWorkflowForm() {
  document.getElementById('add-workflow-form').style.display = 'block';
}

function saveWorkflow() {
  const name = document.getElementById('new-workflow-name').value;
  const status = document.getElementById('new-workflow-status').value;
  const webhookUrl = document.getElementById('new-workflow-url').value; // New input for webhook URL

  if (name && status && webhookUrl) {
    const newWorkflow = {
      id: workflows.length + 1, // auto-increment
      name: name,
      status: status,
      webhookUrl: webhookUrl // Store the webhook URL for the new workflow
    };
    workflows.push(newWorkflow);
    displayWorkflows(); // Refresh workflow cards
    document.getElementById('add-workflow-form').style.display = 'none'; // Hide form
  } else {
    alert('Please fill in all fields.');
  }
}

// Initial call to display workflows
displayWorkflows();
