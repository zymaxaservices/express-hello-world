const express = require('express');
const states = require('./states.json');
const districtsData = require('./districts.json');

const app = express();
const PORT = 3000;

app.get('/states', (req, res) => {
    let options = '<option data-code="0" value="0">Select State</option>';
    states.States.forEach(state => {
        options += `<option data-code="${state.state_code}" value="${state.state}">${state.state}</option>`;
    });
    res.send(options);
});

app.get('/districts/:stateCode', (req, res) => {
    const stateCode = parseInt(req.params.stateCode); // Convert state code to integer
    
    const filteredDistricts = districtsData.Districts.filter(district => parseInt(district.state_code) === stateCode);
    
    if (filteredDistricts.length === 0) {
        return res.status(404).send('Districts not found for the given state code.');
    }

    let options = '<option value="0">Select District</option>';
    filteredDistricts.forEach(district => {
        options += `<option value="${district.district}">${district.district}</option>`;
    });
    res.send(options);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
