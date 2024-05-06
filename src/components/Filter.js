import React, { useEffect, useState } from 'react';
import  Grid  from '@mui/material/Grid';
import  TextField  from '@mui/material/TextField';
import JobList from './JobList';

const   Filters = () => {
  const [jobData, setJobData] = useState([]);
  const [filters, setFilters] = useState({
    role: '',
    companyName: '',
    location: ''
  });

  useEffect(() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Add any necessary body data here, if required by the API
      };
  // Fetch the JSON data from the API endpoint
  fetch('https://api.weekday.technology/adhoc/getSampleJdJSON',requestOptions)
    .then(response => response.json())
    .then(data => {
      // Once data is fetched, set it to the state
      setJobData(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}, []);
   //console.log(jobData)

  const filteredJobData = jobData.jdList&&jobData.jdList.filter(Data => {
    // console.log(Data, filters)
    return (
      Data.jobRole?.toLowerCase().includes(filters.role?.toLowerCase()) &&
      Data.companyName?.toLowerCase().includes(filters.companyName?.toLowerCase()) &&
      Data.location?.toLowerCase().includes(filters.location?.toLowerCase())
    );
  });
  console.log(filteredJobData);

  const handleFilterChange = (filterKey, value) => {
    setFilters({
      ...filters,
      [filterKey]: value
    });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Role"
            value={filters.role}
            onChange={e => handleFilterChange('role', e.target.value)}
          />
          <TextField
            label="Company Name"
            value={filters.companyName}
            onChange={e => handleFilterChange('companyName', e.target.value)}
          />
          <TextField
            label="Location"
            value={filters.location}
            onChange={e => handleFilterChange('location', e.target.value)}
          />
        </Grid>
        {filteredJobData&&filteredJobData.map((jobData, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <JobList jdList={jobData} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Filters;
