import { useState } from "react"
import NextLink from "next/link"
import { useForm } from "react-hook-form"
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import { ErrorOutline } from "@mui/icons-material"
import { AuthLayout } from "@/components/layout"
import { validations } from "@/utils"
import { tesloApi } from "@/api"
import { useAuthContext } from "@/hooks"
import { useRouter } from "next/router"

type Props = {}

type FormData = {
  email: string
  password: string
}

function LoginPage({ }: Props) {
  const router = useRouter()
  const [showError, setShowError] = useState(false)
  const { isAuth, loginUser } = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()


  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)
    const isValidLogin = await loginUser({ email, password })

    if (!isValidLogin) {
      setShowError(true)
      setTimeout(() => { setShowError(false) }, 3000);
      return
    }
    const destination = router.query.p?.toString() || '/'
    router.replace(destination)
  }

  return (
    <AuthLayout title="Iniciar sesión">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate >

        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component={'h1'}>Iniciar sesión</Typography>
              <Chip
                label='No reconocemos ese usuario/contraseña'
                color='error'
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label='Correo'
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'El campo es obligatorio',
                  validate: validations.isEmail
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="password"
                label='Contraseña'
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es obligatorio',
                  minLength: { value: 6, message: 'Deben ser mínimo 6 caractéres' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button sx={{ ':hover': { color: 'white' } }} className="circular-btn" fullWidth color='secondary' size='large' type="submit">
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'end'}>
              <NextLink href={router.query?.p ? `/auth/register?p=${router.query?.p}` : '/auth/register'} passHref legacyBehavior>
                <Link underline="always">¡Regístrate!</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage