import { useState } from "react"
import { useRouter } from "next/router"
import ShopLayout from "@/components/layout/ShopLayout"
import { SizeSelector } from "@/components/products"
import { ItemCounter, Slider } from "@/components/ui"
import { dbProduct } from "@/database"
import { initialData } from "@/database/seed-data"
import type { ICartProduct, IProduct, ISize } from "@/interfaces"
import { Box, Button, Chip, Grid, Typography } from "@mui/material"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { useCartContext } from "@/hooks/useCartProducts"


interface Props {
  product: IProduct
}

function Slug({ product }: Props) {
  const router = useRouter()
  const { addproductToCart } = useCartContext()
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1
  })

  const selectSizeTempCartProduct = (size: ISize) => {
    setTempCartProduct(prev => ({ ...prev, size }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) return
    addproductToCart(tempCartProduct)
    router.push('/cart')
  }
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3} mx={'auto'}>
        <Grid item xs={12} sm={7}>
          <Slider images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5} lg={4}>
          <Box display={"flex"} flexDirection="column">
            <Typography variant="h1" component="h1">{product.title}</Typography>
            <Typography variant="subtitle1" component="h2">${product.price}</Typography>


            {/* Agregar al carrito */}
            {
              product.inStock ? (
                <>
                  {/* cantidad */}
                  <Box sx={{ my: 2 }}>
                    <Box display={'flex'} gap={'2'} alignItems={'center'} mb={2}>
                      <Typography variant="subtitle2">Cantidad</Typography>
                      <ItemCounter
                        quantity={tempCartProduct.quantity}
                        changeQuantity={onUpdateQuantity}
                      />
                    </Box>
                    <SizeSelector
                      changeSize={selectSizeTempCartProduct}
                      selectedSize={tempCartProduct.size}
                      sizes={product.sizes}
                    />
                  </Box>
                  <Button
                    color="secondary"
                    sx={{ ":hover": { color: "white" } }}
                    className="circular-btn"
                    onClick={onAddProduct}
                  >
                    {
                      tempCartProduct.size ?
                        'Agregar al carrito'
                        :
                        'Debe seleccionar una talla'
                    }

                  </Button>
                </>

              )
                :
                (
                  <Chip label="No hay disponibles" color="error" variant="outlined" />
                )
            }


            {/* desciption */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción: </Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default Slug

// SSR
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = '' } = params as { slug: string }
//   const product = await dbProduct.getProductBySlug(slug)

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }

// }

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await dbProduct.getProductsSlugs()
  const mappedSlugsPaths = slugs.map(({ slug }) => ({ params: { slug } }))
  return {
    paths: mappedSlugsPaths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const product = await dbProduct.getProductBySlug(slug)
  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 86400 // 24h
  }
}