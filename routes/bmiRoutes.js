const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

function saveDataToFile(data) {
  const filePath = 'bmiData.json';
  let allData = [];
  if (fs.existsSync(filePath)) {
    const dataFromFile = fs.readFileSync(filePath);
    allData = JSON.parse(dataFromFile);
  }
  allData.push(data);
  fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));
  console.log('Data saved to file successfully.');
}

router.get('/bmicalculator', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/bmiCalculator.html'));
});
router.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/history.html'));
});

router.post('/bmicalculator', (req, res) => {
  const name = req.body.name;
  const age = parseInt(req.body.age);
  const gender = req.body.gender;
  const unit = req.body.unit;
  const height = Number(req.body.height);
  const weight = Number(req.body.weight);

  console.log(name, age, gender, unit, height, weight)
  
  let bmi;
  if (unit === 'metric') {
    bmi = weight / ((height / 100) * (height / 100));
  } else if (unit === 'imperial') {
    bmi = (weight / (height * height)) * 703; 
  }

  let bmiCategory = 'N/A';
  if (bmi !== undefined && !isNaN(bmi)) {
    if (gender === 'male') {
      if (age <= 18) {
        if (bmi < 17) {
          bmiCategory = 'Underweight';
        } else if (bmi >= 17 && bmi < 20) {
          bmiCategory = 'Normal weight';
        } else if (bmi >= 20 && bmi < 25) {
          bmiCategory = 'Overweight';
        } else {
          bmiCategory = 'Obese';
        }
      } else {
        if (bmi < 18.5) {
          bmiCategory = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
          bmiCategory = 'Normal weight';
        } else if (bmi >= 25 && bmi < 30) {
          bmiCategory = 'Overweight';
        } else {
          bmiCategory = 'Obese';
        }
      }
    } else if (gender === 'female') {
      if (age <= 18) {
        if (bmi < 16.5) {
          bmiCategory = 'Underweight';
        } else if (bmi >= 16.5 && bmi < 19) {
          bmiCategory = 'Normal weight';
        } else if (bmi >= 19 && bmi < 24) {
          bmiCategory = 'Overweight';
        } else {
          bmiCategory = 'Obese';
        }
      } else {
        if (bmi < 17.5) {
          bmiCategory = 'Underweight';
        } else if (bmi >= 17.5 && bmi < 23) {
          bmiCategory = 'Normal weight';
        } else if (bmi >= 23 && bmi < 28) {
          bmiCategory = 'Overweight';
        } else {
          bmiCategory = 'Obese';
        }
      }
    }
  }

  const currentTime = new Date(); 
  const bmiData = {
    name: name,
    age: age,
    gender: gender,
    unit: unit,
    height: height,
    weight: weight,
    bmi: (bmi !== undefined && !isNaN(bmi)) ? bmi.toFixed(2) : 'N/A',
    category: bmiCategory,
    timestamp: currentTime.toLocaleString()
  };
  saveDataToFile(bmiData);
  
  res.send({
    bmi: (bmi !== undefined && !isNaN(bmi)) ? bmi.toFixed(2) : 'N/A',
    category: bmiCategory,
    message: 'BMI calculated successfully'
  });
});



router.get('/getHistory', (req, res) => {
  const filePath = path.join(__dirname, '../bmiData.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error reading file');
    } else {
      try {
        const jsonData = JSON.parse(data);
        const formattedData = JSON.stringify(jsonData, null, 2); 
        console.log(formattedData)
        res.header('Content-Type', 'application/json').send(formattedData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.status(500).send('Error parsing JSON');
      }
    }
  });
});


module.exports = router;
