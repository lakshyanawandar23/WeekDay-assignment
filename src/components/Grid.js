import React, { useEffect, useState,useRef } from 'react';
import  Grid  from '@mui/material/Grid';
import  TextField  from '@mui/material/TextField';
import JobList from './JobList'; // assuming your SampleCard component is in a separate file
import { Button } from '@mui/material';
const SampleCardList = () => {
  const [jobData, setJobData] = useState([]);
  const [filters, setFilters] = useState({
    role: '',
    companyName: '',
    location: '',
    minExp:'',
  });
  const [numItemsToShow, setNumItemsToShow] = useState(6); // Initial number of items to show
  const observer = useRef();
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
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // If intersection is observed, increase the number of items to show
        setNumItemsToShow(prevNumItems => prevNumItems + 6);
      }
    });

    // Attach observer to the last item
    if (observer.current) {
      observer.current.observe(document.querySelector('.observe-intersection'));
    }

    // Cleanup
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
}, []);
const filteredJobData = jobData.jdList&&jobData.jdList.filter(Data => {
  // console.log(Data, filters)
  return (
    Data.jobRole?.toLowerCase().includes(filters.role?.toLowerCase()) &&
    Data.companyName?.toLowerCase().includes(filters.companyName?.toLowerCase()) &&
    Data.location?.toLowerCase().includes(filters.location?.toLowerCase())&&
    (filters.minExp === '' || parseInt(Data.minExp) >= parseInt(filters.minExp))
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
    <div >
    <Grid container spacing={3} style={{marginBottom:"10px",marginTop:"10px",marginLeft:"10px"}} >
        <Grid item xs={12} >
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
           <TextField
            label="minExp"
            value={filters.minExp}
            onChange={e => handleFilterChange('location', e.target.value)}
          />
        </Grid>
        </Grid>
    <Grid container spacing={3} style={{marginLeft:"5px"}}>
    {filteredJobData ?
    filteredJobData&&filteredJobData.slice(0,numItemsToShow).map((jobData, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <JobList jdList={jobData} />
          </Grid>
        ))
        :
      jobData.jdList&&jobData.jdList.slice(0,numItemsToShow).map((data, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <JobList jdList={data} />
        </Grid>
      ))
    }
    <Grid item xs={12} >
          {numItemsToShow < jobData.jdList?.length && (
            <Button variant="contained" color="primary"  style={{marginLeft:"12px",alignContent:"center"}} onClick={() => setNumItemsToShow(prevNumItems => prevNumItems + 6)}>
              Show More
            </Button>
          )}
        </Grid>
        <div className="observe-intersection" style={{ height: '1px' }} />
    </Grid>
    </div>
  );
};

export default SampleCardList;
