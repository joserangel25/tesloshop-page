import type { IProduct } from "@/interfaces"
import { Grid } from "@mui/material"
import { FC } from "react"
import { ProductCart } from "./"

interface Props {
  products: IProduct[]
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {
        products.map((product) => (
          <ProductCart key={product.slug} product={product} />
        ))
      }
    </Grid>
  )
}