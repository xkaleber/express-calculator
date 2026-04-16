const express = require('express')

const app = express();

// ROOT ROUTE - displays a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Express Calculator!');
});

// MEAN ROUTE - calculates the mean of a list of numbers
app.get('/mean', (req, res) => {
  const { numbers } = req.query;

  // If no numbers are provided, return an error
  if (!numbers) {
    return res.status(400).send('Please provide a list of numbers as a query parameter, e.g. ?numbers=1,2,3');
  }

  // Convert the numbers to an array of floats to perform calculations
  const nums = numbers.split(',').map(Number);

  // If any of the values are not valid numbers, return an error
  if (nums.some(isNaN)) {
    return res.status(400).send('All values in the numbers query parameter must be valid numbers');
  }

  // Calculate the mean
  const mean = nums.reduce((acc, n) => acc + n, 0) / nums.length;

  // Send the result as a response
  res.send(`The mean of [${nums.join(', ')}] is ${mean}`);
});

// MEDIAN ROUTE - calculates the median of a list of numbers
app.get('/median', (req, res) => {
  const { numbers } = req.query;

  // If no numbers are provided, return an error
  if (!numbers) {
    return res.status(400).send('Please provide a list of numbers as a query parameter, e.g. ?numbers=1,2,3');
  }

  // Convert the numbers to an array of floats to perform calculations
  const nums = numbers.split(',').map(Number);

  // If any of the values are not valid numbers, return an error
  if (nums.some(isNaN)) {
    return res.status(400).send('All values in the numbers query parameter must be valid numbers');
  }

  // Sort the numbers to calculate the median
  nums.sort((a, b) => a - b);
  const mid = Math.floor(nums.length / 2); // Find the middle index
  let median; // Initialize the median variable

  // Calculate the median
  if (nums.length % 2 === 0) {
    median = (nums[mid - 1] + nums[mid]) / 2;
  } else {
    median = nums[mid];
  }

  // Send the result as a response
  res.send(`The median of [${nums.join(', ')}] is ${median}`);
});

// MODE ROUTE - calculates the mode of a list of numbers
app.get('/mode', (req, res) => {
  const { numbers } = req.query;

  // If no numbers are provided, return an error
  if (!numbers) {
    return res.status(400).send('Please provide a list of numbers as a query parameter, e.g. ?numbers=1,2,3');
  }

  // Convert the numbers to an array of floats to perform calculations
  const nums = numbers.split(',').map(Number);

  // If any of the values are not valid numbers, return an error
  if (nums.some(isNaN)) {
    return res.status(400).send('All values in the numbers query parameter must be valid numbers');
  }

  // Calculate the mode
  const frequency = {}; // Object to store the frequency of each number
  let maxFreq = 0; // Variable to store the maximum frequency
  let mode; // Variable to store the mode

  // Calculate the frequency of each number
  nums.forEach(n => { // For each number in the array
    frequency[n] = (frequency[n] || 0) + 1; // Increment the frequency of the current number
    if (frequency[n] > maxFreq) { // If the frequency of the current number is greater than the maximum frequency
      maxFreq = frequency[n]; // Update the maximum frequency
      mode = n; // Update the mode
    }
  });

  // Send the result as a response
  res.send(`The mode of [${nums.join(', ')}] is ${mode}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});