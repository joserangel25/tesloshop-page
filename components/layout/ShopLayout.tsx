import Head from "next/head"
import { FC, PropsWithChildren } from "react"
import { Navbar, SideMenu } from "../ui"

interface Props {
  title: string
  pageDescription: string
  imageUrl?: string
  children: JSX.Element | JSX.Element[]
}

const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageUrl }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {
          imageUrl && (
            <meta name="og:image" content={imageUrl} />
          )
        }
      </Head>

      <Navbar />

      <SideMenu />

      <main style={{
        margin: '80px auto',
        maxWidth: '1300px',
        padding: '0px 30px'
      }}>
        {children}
      </main>

      <footer></footer>
    </>
  )
}

export default ShopLayout