import { useMemo, useState } from "react"
import NextLink from "next/link"
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Chip } from "@mui/material"
import type { IProduct } from "@/interfaces"

interface Props {
  product: IProduct
}

export const ProductCart = ({ product }: Props) => {
  const [IsHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const productImage = useMemo(() => {
    return IsHovered ?
      `/products/${product.images[1]}`
      : `/products/${product.images[0]}`
  }, [IsHovered, product.images])
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href={`/products/${product.slug}`} passHref legacyBehavior prefetch={false}>
          <Link>
            <CardActionArea>

              {
                !product.inStock && (
                  <Chip
                    color='primary'
                    label='No disponible'
                    sx={{
                      position: 'absolute',
                      zIndex: 99,
                      top: 20,
                      left: 10
                    }}
                  />
                )
              }
              <CardMedia
                component="img"
                className="fadeIn"
                image={productImage}
                alt={`Imagen referencia del producto ${product.title}`}
                onLoad={() => setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  )
}