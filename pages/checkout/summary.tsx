import NextLink from "next/link"
import { Typography, Grid, Card, Link, CardContent, Divider, Box, Button } from "@mui/material"
import { CartList, OrderSumary } from "@/components/cart"
import ShopLayout from "@/components/layout/ShopLayout"


type Props = {}

function SummaryPage({ }: Props) {
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
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ my: 1 }} display={'flex'} justifyContent={'space-between'}>
                <Typography variant="subtitle1">Dirección de entrega</Typography>

                <NextLink href='/checkout/address' passHref legacyBehavior>
                  <Link underline="always">Editar </Link>
                </NextLink>
              </Box>

              <Typography >jose Rangel</Typography>
              <Typography >Cll 36 # 5a- 04</Typography>
              <Typography >Barranquilla</Typography>
              <Typography >Colombia</Typography>
              <Typography > +57 3024311457</Typography>

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