function toampm(date_string){// Assuming your date string is in UTC format
  const utcDateString = date_string;

  // Step 1: Parse the UTC date string
  const utcDate = new Date(utcDateString);

  // Step 2: Convert the date to the local time zone
  // const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);

  // Step 3: Extract hours and minutes
  const hours = utcDate.getHours();
  const minutes = utcDate.getMinutes();

  // Step 4: Format hours in 12-hour format
  const formattedHours = hours % 12 || 12; // Use 12 when hours is 0

  // Step 5: Display the formatted time
  const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;

  return formattedTime;
};

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
    weightLogDiv.innerHTML = '<h2>Weight Log</h2>';// Create a table element
    const stats = document.createElement('div');
    const table = document.createElement('table');
    // table.border = '1';
    let len = 0;
    let daylen = 0;
    // console.log(len-1)
  
    // Create table headers
    const headers = ['Date', 'Time', 'Weight (in kg)'];
    const headerRow = document.createElement('tr');
    headers.forEach((headerText) => {
      const headerCell = document.createElement('th');
      headerCell.textContent = headerText;
      headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    let sum = 0;
    let threeSum = 0;
    let dateOld = '';
    let threelen = 0;
  
    // Populate table with weight entries
    weightData.slice().reverse().forEach((entry) => {
      const entryRow = document.createElement('tr');
  
      // Extract date and time from ISO string
      const isoDate = new Date(entry.date);
      const date = isoDate.toLocaleDateString();
      const time = toampm(isoDate);
      // time = time.

      if (dateOld !== date)
      {
        daylen += 1;
      };
      len += 1;

      if(daylen <= 3)
      {
        threeSum += entry.weight;
        threelen += 1;
      };
      sum += entry.weight;
  
      // Create table cells for date, time, and weight
      const dateCell = document.createElement('td');
      dateCell.textContent = date;
      const timeCell = document.createElement('td');
      timeCell.textContent = time;
      const weightCell = document.createElement('td');
      weightCell.textContent = entry.weight;
  
      // Append cells to the row
      entryRow.appendChild(dateCell);
      entryRow.appendChild(timeCell);
      entryRow.appendChild(weightCell);
  
      // Append the row to the table
      dateOld = date;
      table.appendChild(entryRow);

    });

    stats.innerHTML = `Average Weight: ${Math.round((sum / len + Number.EPSILON)*100)/100}<br>Three day average: ${Math.round((threeSum / threelen + Number.EPSILON)*100)/100}<p></p>`;
    // Append the table to the weightLogDiv
    weightLogDiv.appendChild(stats);
    weightLogDiv.appendChild(table);

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