import { useState } from "react"
import { useRouter } from "next/router"

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@mui/material"
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined
} from "@mui/icons-material"
import { useUiContext } from "@/hooks"


export const SideMenu = () => {
  const { isMenuOpen, toogleSideMenu } = useUiContext()
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const goTo = (url: string) => {
    toogleSideMenu()
    router.push(url)
  }

  const onSearchTerm = () => {
    if (!searchTerm) return
    goTo(`/search/${searchTerm}`)
  }
  return (
    <Drawer
      open={isMenuOpen}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={toogleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>

        <List>
          <ListItemButton
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <Input
              type='text'
              autoFocus
              value={searchTerm}
              onKeyUp={(e) => e.key === 'Enter' && onSearchTerm()}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={onSearchTerm}
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Perfil'} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Mis Ordenes'} />
          </ListItemButton>


          <ListItemButton
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => goTo('/category/men')}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Hombres'} />
          </ListItemButton>

          <ListItemButton
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => goTo('/category/women')}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Mujeres'} />
          </ListItemButton>

          <ListItemButton
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => goTo('/category/kid')}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={'Niños'} />
          </ListItemButton>


          <ListItemButton>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={'Ingresar'} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={'Salir'} />
          </ListItemButton>


          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem >
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={'Productos'} />
          </ListItem>
          <ListItem >
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Ordenes'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={'Usuarios'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}