import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@emotion/react'
import { lightTheme, darkTheme } from '@/themes'
import { CssBaseline } from '@mui/material'
import { SWRConfig } from 'swr'
import { AuthProvider, CartProvider, UiProvider } from '@/context'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider>
      <SWRConfig value={{
        fetcher: (resorce, init) => fetch(resorce, init).then(res => res.json())
      }}>
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
