import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({rows}) {
  const thisYear = new Date().getFullYear()
  const numbers  = {total: rows.length, 
    declared: rows.filter(r => r.data_ir.includes(thisYear)).length, 
    notDeclared: rows.filter(r => !r.data_ir.includes(thisYear)).length}

  return (
    <Grid container spacing={3}>

      <Grid item xs={4}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h4" component="div">
            <strong>{numbers.total}</strong>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <strong>Total de Clientes</strong>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h4" component="div" color="green">
            <strong>{numbers.declared}</strong>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <strong>IR já declarado este ano</strong>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h4" component="div" color="orange">
            <strong>{numbers.notDeclared}</strong>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <strong>IR não declarado este ano</strong>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
    </Grid>

  );
}