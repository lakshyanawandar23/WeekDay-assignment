import React ,{useState,useEffect}from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Avatar,Button,CardActions,IconButton} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {FlashOn} from '@mui/icons-material'
const useStyles = makeStyles({
    container: {
      display: 'flex',
     alignItems: 'center',
      marginBottom: '10px',
    },
    company: {
      marginLeft: '30px',
    },
    action:{
        alignItems:'center',
    },
    easyApplyButton: {
        margin: '20px auto 0',
         // Light green color
        color: '##7CFC00',
      },
  });
const JobList = (Data) => {
    const classes=useStyles()
   const jobData=Data;
    // useEffect(() => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         // Add any necessary body data here, if required by the API
    //       };
    //   // Fetch the JSON data from the API endpoint
    //   fetch('https://api.weekday.technology/adhoc/getSampleJdJSON',requestOptions)
    //     .then(response => response.json())
    //     .then(data => {
    //       // Once data is fetched, set it to the state
    //       setJobData(data);
    //     })
    //     .catch(error => console.error('Error fetching data:', error));
    // }, []);
  // console.log(jobData)
    return (
      <div>
      {jobData&&
        <Card  sx={{ maxWidth: 345}} style={{maxHeight:600}} >
          <CardContent>
          <div className={classes.container}>
          <Avatar
         // component="img"
        height="3"
        width="3"
        src={jobData.jdList&&jobData.jdList.logoUrl}
        alt="not found"
        >
          </Avatar>
          <div style={{marginLeft:"20px"}}>
          <Typography color="textSecondary" sx={{fontSize:14}} className={classes.companyName}>
             {jobData.jdList&&jobData.jdList.companyName}
            </Typography>
            <Typography color="textSecondary" sx={{fontSize:14}} className={classes.companyName}>
               {jobData.jdList&&jobData.jdList.jobRole.charAt(0).toUpperCase()+jobData.jdList.jobRole.slice(1)+" Engineer"}
            </Typography>
            <Typography color="textSecondary" sx={{fontSize:14}} className={classes.companyName}>
             {jobData.jdList&&jobData.jdList.location}
            </Typography>
            </div>
        </div>
            <Typography variant="body2" >
              {jobData.jdList&&jobData.jdList.jobDetailsFromCompany}
            </Typography>
            <CardActions >
                <Button size="small" style={{marginLeft:"80px"}}>View Job</Button>
            </CardActions>
            <div>
            <Typography color="textSecondary">
           Minimum Experience:
           <div>{jobData.jdList&&jobData.jdList.minExp+" years"}</div> 
            </Typography>
            </div>
            <div style={{color:"green"}}>
            <IconButton color='success'>
              <FlashOn/>
              </IconButton>
            <Button  >
              Easy Apply
            </Button>
            </div>
          </CardContent>
        </Card>
      }
        </div>
    
    )

}


export default JobList
