import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form'
import ShopLayout from '@/components/layout/ShopLayout'
import { Box, Typography, Grid, TextField, FormControl, MenuItem, Button } from '@mui/material'
import { countries, jwt } from '@/utils'
import { useRouter } from 'next/router'
import type { IShippingAddress } from '@/interfaces'
import { getAddressFromCookie } from '@/utils/shippingAddress'
import { useCartContext } from '@/hooks/useCartProducts'

type Props = {}

function AddresPage({ }: Props) {

  const router = useRouter()
  const { updateAddress, shippingAddress } = useCartContext()
  const { register, handleSubmit, formState: { errors } } = useForm<IShippingAddress>({
    defaultValues: getAddressFromCookie()
  })

  const onSubmitAddress = (data: IShippingAddress) => {
    updateAddress(data)
    router.push('/checkout/summary')
  }
  return (
    <ShopLayout title='Dirección' pageDescription='Confirmar la dirección del destino'>
      <Typography variant='h1' component={'h1'}> Dirección </Typography>
      <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Nombre"
              variant='filled'
              fullWidth
              {...register('firtsName', {
                required: 'Este campo es obligatorio'
              })}
              error={!!errors.firtsName}
              helperText={errors.firtsName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Apellido"
              variant='filled'
              fullWidth
              {...register('lastName', {
                required: 'Este campo es obligatorio'
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              variant='filled'
              fullWidth
              {...register('address', {
                required: 'Este campo es obligatorio'
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección 2 (opcional) "
              variant='filled'
              fullWidth
              {...register('address2')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Código postal"
              variant='filled'
              fullWidth
              {...register('zip', {
                required: 'Este campo es obligatorio'
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>

              {/* <InputLabel>País</InputLabel> */}
              <TextField
                select
                variant='filled'
                label="País"
                {...register('country', {
                  required: 'Este campo es obligatorio'
                })}
                defaultValue={shippingAddress?.country}
                error={!!errors.country}
              // helperText={errors.zip?.message}
              >
                {
                  countries.countries.map(country => (
                    <MenuItem
                      key={country.code}
                      value={country.code}

                    >{country.name}</MenuItem>
                  ))
                }
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Ciudad"
              variant='filled'
              fullWidth
              {...register('city', {
                required: 'Este campo es obligatorio'
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Teléfono"
              variant='filled'
              fullWidth
              {...register('phone', {
                required: 'Este campo es obligatorio'
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display={'flex'} justifyContent={'center'}>
          <Button
            color='secondary'
            className='circular-btn'
            type='submit'
            size='large'
            sx={{ ':hover': { color: 'white' } }}
          >Revisar pedido</Button>
        </Box>
      </form>
    </ShopLayout>
  )
}

export default AddresPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = '' } = req.cookies
  let isValidToken = false;

  try {
    jwt.validateToken(token)
    isValidToken = true
  } catch (error) {
    console.log('error de token en checkout/address')
  }

  if (!isValidToken) {
    return {
      redirect: {
        destination: '/auth/login?p=/checkout/address',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }

}