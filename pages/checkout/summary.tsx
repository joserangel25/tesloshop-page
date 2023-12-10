import NextLink from "next/link"
import { Typography, Grid, Card, Link, CardContent, Divider, Box, Button } from "@mui/material"
import { CartList, OrderSumary } from "@/components/cart"
import ShopLayout from "@/components/layout/ShopLayout"
import { useCartContext } from "@/hooks/useCartProducts"
import { countries } from "@/utils"


type Props = {}

function SummaryPage({ }: Props) {
  const { shippingAddress, numberOfItems } = useCartContext()
  if (!shippingAddress) {
    return <></>
  }

  const { firtsName, lastName, address, address2, zip, country, city, phone } = shippingAddress
  return (
    <ShopLayout title="Resumen del pedido" pageDescription="Valida los datos y confirma la orden">
      <Typography variant="h1" component="h1">Resumen de tu pedido</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* CartList */}
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen ({numberOfItems} {numberOfItems > 1 ? 'productos' : 'producto'})</Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ my: 1 }} display={'flex'} justifyContent={'space-between'}>
                <Typography variant="subtitle1">Dirección de entrega</Typography>

                <NextLink href='/checkout/address' passHref legacyBehavior>
                  <Link underline="always">Editar </Link>
                </NextLink>
              </Box>

              <Typography >{firtsName} {lastName}</Typography>
              <Typography >{address}{address2 && `, ${address2}`}</Typography>
              <Typography >{city}, {zip}</Typography>
              <Typography >{countries.getCountryByCode(country) || ''}</Typography>
              <Typography >{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent={'end'}>

                <NextLink href='/cart' passHref legacyBehavior>
                  <Link underline="always">Modificar pedido</Link>
                </NextLink>
              </Box>
              {/* Order sumary */}
              <OrderSumary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" sx={{ ":hover": { color: 'white' } }} className="circular-btn" fullWidth>¡Confirmar!</Button>
              </Box>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage 