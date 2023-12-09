import ShopLayout from '@/components/layout/ShopLayout'
import { Box, Typography } from '@mui/material'
import React from 'react'

type Props = {}

function Custom404({ }: Props) {
  return (
    <ShopLayout title='Page not found' pageDescription='La página no existe o no fue encontrada'>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }} justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
        <Typography variant='h1' component="h1" fontSize={60} fontWeight={200}>404 | </Typography>
        <Typography ml={2} textAlign="center">No encontramos ningún ddato.</Typography>
      </Box>
    </ShopLayout>
  )
}

export default Custom404