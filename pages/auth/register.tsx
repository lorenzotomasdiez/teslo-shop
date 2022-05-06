import { ErrorOutline } from '@mui/icons-material'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { tesloApi } from '../../api'
import { AuthLayout } from '../../components/layouts'
import { AuthContext } from '../../context'
import { validations } from '../../utils'

type FormData = {
    name     :string,
    email    :string,
    password :string
}

const RegisterPage = () => {
  const router = useRouter();
  const {registerUser} = useContext(AuthContext);
  const {register, handleSubmit, formState:{errors}} = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const onRegisterForm = async({name, email, password}:FormData) => {
    setShowError(false);
    const {hasError, message} = await registerUser(name, email, password);
    
    if(hasError){
        setShowError(true);
        setErrorMessage(message!);
        setTimeout(() => {
            setShowError(false);
        }, 3000)
        return
    }

    router.replace('/');
  }
  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Box sx={{width: 350, padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Crear usuario</Typography>
                        <Chip 
                            label={errorMessage}
                            color="error"
                            icon={<ErrorOutline />}
                            className="fadeIn"
                            sx={{display: showError ? 'flex': 'none'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre completo"
                            variant="filled"
                            fullWidth
                            {
                                ...register('name', {
                                    required: 'Este campo es obligatorio',
                                    minLength: {value: 2, message: 'Minimo 2 caracteres'}
                                })
                            }
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="email"
                            label="Correo"
                            variant="filled"
                            fullWidth
                            {
                                ...register('email', {
                                    required: 'Este campo es obligatorio',
                                    validate: validations.isEmail
                                })
                            }
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Contraseña"
                            variant="filled"
                            type="password"
                            fullWidth
                            {
                                ...register('password', {
                                    required: 'Este campo es obligatorio',
                                    minLength: {value: 6, message: 'Minimo 6 caracteres'}
                                })
                            }
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" size="large" fullWidth type="submit">
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                        <NextLink href="/auth/login " passHref>
                            <Link underline='always'>
                                Ya tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage