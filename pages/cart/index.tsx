import { useEffect } from "react"
import { useRouter } from "next/router"
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { CartList, OrderSumary } from "@/components/cart"
import ShopLayout from "@/components/layout/ShopLayout"
import { useCartContext } from "@/hooks/useCartProducts"

type Props = {}

export default function CartPage({ }: Props) {

  const router = useRouter()
  const { isLoaded, cart } = useCartContext()

  useEffect(() => {
    if (isLoaded && !cart.length) {
      router.replace('/cart/empty')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, cart])

  if (!isLoaded || !cart.length) {
    return <></>
  }
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
                <Button
                  color="secondary"
                  sx={{ ":hover": { color: 'white' } }}
                  className="circular-btn"
                  href="/checkout/address"
                  fullWidth
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}
