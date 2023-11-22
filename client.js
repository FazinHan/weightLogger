const logWeight = async (weight) => {
  const d = new Date();
    try {
      const response = await fetch('/logWeight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight:weight, date:d }),
      });
  
      if (response.ok) {
        console.log('Weight logged successfully');
      } else {
        console.error('Failed to log weight:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Function to retrieve and display weight data
  const getWeightData = async () => {
    try {
      const response = await fetch('/getWeight');
  
      if (response.ok) {
        const weightData = await response.json();
        displayWeightData(weightData);
      } else {
        console.error('Failed to retrieve weight data:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Function to display weight data
  const displayWeightData = (weightData) => {
    const weightLogDiv = document.getElementById('weightLog');
    weightLogDiv.innerHTML = '<h2>Weight Log</h2>';
  
    weightData.forEach((entry) => {
      const entryDiv = document.createElement('div');
      entryDiv.textContent = `Weight: ${entry.weight}, Date: ${entry.date}`;
      weightLogDiv.appendChild(entryDiv);
    });
  };
  
  // Event listener for the logWeightForm
  document.getElementById('logWeightForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const weightInput = document.getElementById('weight');
    const weight = parseFloat(weightInput.value);
    
    if (!isNaN(weight)) {
      logWeight(weight);
      // Optionally, you can update the displayed weight data after logging
      getWeightData();
      weightInput.value = ''; // Clear the input field
    } else {
      alert('Please enter a valid weight.');
    }
  });
  
  // Fetch and display initial weight data when the page loads
  getWeightData();