import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'


export const TotalUsers = ({title, data}) => {
  return (
    <>
   
    <Card sx={{ maxWidth: 345 }}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h3" color="text.secondary">
          {data}
        </Typography>
      </CardContent>

    </Card>
    </>
  )
}
