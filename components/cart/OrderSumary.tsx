import { useCartContext } from "@/hooks/useCartProducts"
import { Grid, Typography } from "@mui/material"
import { currency } from "@/utils"

interface Props { }

export const OrderSumary = ({ }: Props) => {
  const { numberOfItems, subTotal, impuesto, total } = useCartContext()
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Producto{numberOfItems > 1 ? 's' : ''} </Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography variant="subtitle2">{numberOfItems}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography variant="subtitle2">{currency.formatMoney(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>IVA (19%)</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography variant="subtitle2">{currency.formatMoney(impuesto)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="subtitle1">Total a pagar</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography variant="subtitle1">{currency.formatMoney(total)}</Typography>
      </Grid>
    </Grid>
  )
}