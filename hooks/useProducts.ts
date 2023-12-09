import type { IProduct } from "@/interfaces";
import useSWR, { SWRConfiguration } from "swr";

// Podemos trabajar el hook de esta manera, directo el fetcher o 
// usarlo como un provider en el _app
// const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json())
// const { data, error } = useSWR<IProduct[]>(`/api${url}`, fetcher)


export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IProduct[]>(`/api${url}`, config)

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error
  }
}

