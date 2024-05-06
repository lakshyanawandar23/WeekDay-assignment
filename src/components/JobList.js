import React ,{useState,useEffect}from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Avatar,Button,CardActions,IconButton} from '@mui/material';
import { makeStyles } from '@mui/styles';
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
      cardHover: {
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      },
  });
const JobList = (Data) => {
    const classes=useStyles()
   const jobData=Data;
  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
} 
    return (
      <div>
      {jobData&&
        <Card  sx={{ maxWidth: 345}} style={{maxHeight:600}} className={classes.cardHover} >
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
              {jobData.jdList&&addEllipsis(jobData.jdList.jobDetailsFromCompany,200)}
            </Typography>
            <CardActions >
                <Button size="small" style={{marginLeft:"80px"}}>View Job</Button>
            </CardActions>
            <div style={{marginBottom:"2px"}}>
            <Typography color="textSecondary">
           Minimum Experience:
           <div>{jobData.jdList&&jobData.jdList.minExp!=null?jobData.jdList.minExp+" years":"0 years"}</div> 
            </Typography>
            </div>
            <Button style={{backgroundColor:"#55efc4",color:"white"}} size='large'  fullWidth={true}>
              Easy Apply
            </Button>
          </CardContent>
        </Card>
      }
        </div>
    
    )

}


export default JobList
