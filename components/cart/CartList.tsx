import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { ItemCounter } from '../ui'
import { useCartContext } from '@/hooks/useCartProducts'
import { ICartProduct } from '@/interfaces'

interface Props {
  isEditable?: boolean
}

export const CartList = ({ isEditable = false }: Props) => {
  const { cart, updateCartQuantity, deleteProductOfCart } = useCartContext()

  const updateQuantity = (product: ICartProduct, value: number) => {
    product.quantity = value
    updateCartQuantity(product)
  }
  return (
    <>
      {
        cart.map((product) => (
          <Grid container spacing={2} key={`${product.slug}-${product.quantity}-${product.size}`} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <NextLink href={`/products/${product.slug}`} passHref legacyBehavior>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.image}`}
                      component="img"
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display="flex" flexDirection={'column'}>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>
                {
                  isEditable ?
                    <ItemCounter
                      quantity={product.quantity}
                      // maxValue={}
                      changeQuantity={(newQuantity) => updateQuantity(product, newQuantity)} />
                    :
                    <Typography variant='subtitle1'>{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                }

              </Box>
            </Grid>
            <Grid item xs={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
              <Typography variant='subtitle1'>$ {product.price} </Typography>
              {
                isEditable && <Button variant='text' color='secondary' onClick={() => deleteProductOfCart(product)}>Borrar</Button>
              }
            </Grid>
          </Grid>
        ))
      }
    </>
  )
}