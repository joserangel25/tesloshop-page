import { useState } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { ClearOutlined, MenuOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { AppBar, Link, Toolbar, Typography, Box, Button, IconButton, Badge, Input, InputAdornment } from "@mui/material"
import { useUiContext } from "@/hooks"
import { useCartContext } from "@/hooks/useCartProducts"

type Props = {}

const MENU_CATEGORY = [
  { url: 'men', label: 'Hombres' },
  { url: 'women', label: 'Mujeres' },
  { url: 'kid', label: 'Niños' }
]

export const Navbar = (props: Props) => {

  const { pathname, push } = useRouter()
  const { toogleSideMenu } = useUiContext()
  const { numberOfItems } = useCartContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = () => {
    if (!searchTerm) return
    push(`/search/${searchTerm}`)
  }
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box sx={{ gap: 1, display: isSearchVisible ? 'none' : { xs: 'none', sm: 'flex' } }}>
          {
            MENU_CATEGORY.map(({ url, label }) => (
              <NextLink href={`/category/${url}`} key={url} passHref legacyBehavior>
                <Link className="fadeIn">
                  <Button color={pathname === `/category/${url}` ? 'secondary' : 'primary'}>{label}</Button>
                </Link>
              </NextLink>
            ))
          }
        </Box>

        <Box flex={1} />


        {
          isSearchVisible
            ? (
              <Input
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                className='fadeIn'
                type='text'
                autoFocus
                value={searchTerm}
                onKeyUp={(e) => e.key === 'Enter' && onSearchTerm()}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsSearchVisible(false)}
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )
            : (
              <IconButton
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                onClick={() => setIsSearchVisible(true)}
                className="fadeIn"
              >
                <SearchOutlined />
              </IconButton>
            )
        }



        {/* Pantallas pequeñas */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toogleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color="secondary">
                <ShoppingCartOutlined />

              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <IconButton
          onClick={toogleSideMenu}
        >
          <MenuOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}