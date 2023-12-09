import NextLink from "next/link"
import { Typography, Grid, Card, Link, CardContent, Divider, Box, Button, Chip } from "@mui/material"
import { CartList, OrderSumary } from "@/components/cart"
import ShopLayout from "@/components/layout/ShopLayout"
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"


type Props = {}

function OrderPage({ }: Props) {
  return (
    <ShopLayout title="Pagar el pedido No. 1292" pageDescription="Realiza el pago de tu pedido.">

      <Box display={'flex'} gap={2} alignItems={'center'} mb={2}>
        <Typography variant="h1" component="h1">Orden No. 123</Typography>
        {/* <Chip
        sx={{ my: 2 }}
        label='Pendiente de pago'
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

        <Chip
          sx={{ my: 2 }}
          label='Orden pagada'
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      </Box>

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
                {/* TODO:  */}
                <Button color="secondary" sx={{ ":hover": { color: 'white' } }} className="circular-btn" fullWidth>Pagar!</Button>
              </Box>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage 