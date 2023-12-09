import ShopLayout from '@/components/layout/ShopLayout'
import { Box, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import React from 'react'

type Props = {}

function AddresPage({ }: Props) {
  return (
    <ShopLayout title='Dirección' pageDescription='Confirmar la dirección del destino'>
      <Typography variant='h1' component={'h1'}> Dirección </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6}>
          <TextField required label="Nombre" variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField required label="Apellido" variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField required label="Dirección" variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Dirección 2 (opcional) " variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField required label="Código postal" variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            {/* <InputLabel>País</InputLabel> */}
            <Select
              variant='filled'
              label="País"
              value={1}
              required
            >
              <MenuItem value={1}>Colombia</MenuItem>
              <MenuItem value={2}>México</MenuItem>
              <MenuItem value={3}>Argentina</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField required label="Ciudad" variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField required label="Teléfono" variant='filled' fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }} display={'flex'} justifyContent={'center'}>
        <Button color='secondary' className='circular-btn' size='large' sx={{ ':hover': { color: 'white' } }}>Revisar pedido</Button>
      </Box>
    </ShopLayout>
  )
}

export default AddresPage