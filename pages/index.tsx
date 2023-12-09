import { Typography } from "@mui/material";
import { ProductList } from "@/components/products";
import ShopLayout from "@/components/layout/ShopLayout";
import { useProducts } from "@/hooks";
import { Loading } from "@/components/ui";


// function Profile() {
//   const { data, error } = useSWR('/api/profile-data', fetcher)

//   if (error) return <div>Failed to load</div>
//   if (!data) return <div>Loading...</div>

//   return (
//     <div>
//       <h1>{data.name}</h1>
//       <p>{data.bio}</p>
//     </div>
//   )
// }

export default function Home() {
  const { products, isError, isLoading } = useProducts('/products')

  return (
    <ShopLayout title="Teslo Shop - Home" pageDescription="Encuentra los mejores productos de Teslo aquí">

      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>Todos los productos</Typography>
      {
        isLoading
          ? <Loading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  )
}
