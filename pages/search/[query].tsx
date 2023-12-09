import { Box, Grid, Typography } from "@mui/material";
import { ProductList } from "@/components/products";
import ShopLayout from "@/components/layout/ShopLayout";
import { GetServerSideProps } from "next";
import { dbProduct } from "@/database";
import { IProduct } from "@/interfaces";

interface Props {
  products: IProduct[]
  successSearch: boolean
  query: string
}

export default function SearchPage({ products, successSearch, query }: Props) {

  return (
    <ShopLayout
      title="Teslo Shop - Búsqueda"
      pageDescription={`Buscando los productos que buscas con el término: ${query}`}
    >
      {
        successSearch ?
          (
            <Grid container justifyContent={'center'} alignItems={'center'} mb={3}>
              <Typography variant="subtitle1">Estos son los resultados para tu búsqueda:</Typography>
              <Typography variant="subtitle1" color={'secondary'} sx={{ ml: 1 }} textTransform={'capitalize'}>{query}</Typography>
            </Grid>
          )
          :
          (
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              textAlign={'center'}
              mb={3}
            >
              <Typography variant="subtitle2">No encontramos resultados relacionados con el término que indicaste.</Typography>
              <Typography variant="subtitle1">¡Tranquilo, te compartimos los últimos productos de la tienda!</Typography>
            </Box>
          )
      }

      <ProductList products={products} />
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }

  if (!query) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }
  let products = await dbProduct.getProductsByTerm(query)
  const successSearch = products.length > 0
  if (!successSearch) {
    products = await dbProduct.getLastProducts()
  }

  return {
    props: {
      products,
      successSearch,
      query
    }
  }

}