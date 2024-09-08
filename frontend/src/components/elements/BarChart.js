import React, { useContext } from "react";
import Papa from "papaparse";
import ReactFileReader from "react-file-reader";
import { Grid, Typography, Box } from '@mui/material';
import {
  Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import AspectRatio from "@mui/joy/AspectRatio"
ChartJS.register(...registerables);

const BarChart = (props) => {
    const { data } = props;
    console.log(data);
    if(data==undefined || data.length ===0){
        return<>データがありません</>
    }
    const obj ={};
    for(let i=0;i<data.length;i++){
        obj[data[i][0]] = data[i].slice(1)
    }
    console.log("obj",obj)
    const labels = obj[Object.keys(obj)[0]];
    const chartData = {
      labels,
      datasets: [
        {
          label: obj["year"][0],
          data: obj[Object.keys(obj)[2]],
          backgroundColor: 'green',
        },
      ],
    };


return( 
    <>
        <Grid container justifyContent="center">
            <Box display="flex" justifyContent="center" width="100%">
                <Typography variant="h6">
                    部署毎の売り上げ
                </Typography>
            </Box>
            <AspectRatio variant="plain"
            ratio="2/1" 
            sx={{width:{xs:"100%", sm:"80%", md:"60%", ls:"50%"}}}>
                <Bar data={chartData} />
            </AspectRatio>
        </Grid>
    </>
)};

export default BarChart;
