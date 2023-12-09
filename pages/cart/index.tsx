import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { CartList, OrderSumary } from "@/components/cart"
import ShopLayout from "@/components/layout/ShopLayout"

type Props = {}

export default function index({ }: Props) {
  return (
    <ShopLayout title="Carrito - 3 productos" pageDescription="Carrito de compras de la tienda">
      <Typography variant="h1" component="h1">Carrito</Typography>
      <Grid container >
        <Grid item xs={12} sm={7}>
          {/* CartList */}
          <CartList isEditable />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }} />

              {/* Order sumary */}
              <OrderSumary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" sx={{ ":hover": { color: 'white' } }} className="circular-btn" fullWidth>Checkout</Button>
              </Box>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}