import { useState } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "@/components/layout"
import { validations } from "@/utils"
import { ErrorOutline } from "@mui/icons-material"
import { useAuthContext } from "@/hooks"

type Props = {}

type FormData = {
  email: string
  password: string
  name: string
}

function RegisterPage({ }: Props) {
  const router = useRouter()
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { registerUser } = useAuthContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onRegisterSubmit = async ({ email, name, password }: FormData) => {
    setShowError(false)
    const { hasError, message } = await registerUser({ email, name, password })

    if (hasError) {
      setShowError(true)
      setTimeout(() => { setShowError(false) }, 3000);
      setErrorMessage(message!)
      return
    }

    const destination = router.query.p?.toString() || '/'
    router.replace(destination)
  }
  return (
    <AuthLayout title="Registro - TesloApp">
      <form onSubmit={handleSubmit(onRegisterSubmit)}>

        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component={'h1'}>¡Regístrate!</Typography>
              <Chip
                label={errorMessage}
                color='error'
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none', mt: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Nombre'
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'El campo es obligatorio',
                  minLength: { value: 3, message: 'Debe ser de al menos 3 caracteres' }
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
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
                label='Contraseña'
                variant="filled"
                fullWidth
                type="password"
                {...register('password', {
                  required: 'El campo es obligatorio',
                  minLength: { value: 6, message: 'Debe ser de al menos 6 caracteres' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                sx={{ ':hover': { color: 'white' } }}
                className="circular-btn"
                fullWidth
                color='secondary' size='large'
                type="submit"
              >
                Crear cuenta
              </Button>
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'end'}>
              <NextLink href={router.query.p ? `/auth/login?p=${router.query?.p}` : '/auth/login'} passHref legacyBehavior>
                <Link underline="always">!Iniciar sesión!</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage