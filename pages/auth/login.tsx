import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';
import React, { useContext, useState } from 'react';
import { AuthLayout } from '../../components/layouts';
import {useForm} from 'react-hook-form';
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';
type FormData = {
    email: string,
    password:string
}

const LoginPage = () => {
  const router = useRouter();
  const {loginUser} = useContext(AuthContext);
  const {register, handleSubmit, formState:{errors}} = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const onLoginUser = async ({email, password}:FormData) => {
    setShowError(false);
    const isValidLogin = await loginUser(email, password);

    if(!isValidLogin) {
    setShowError(true);
        setTimeout(() => {
            setShowError(false)
        }, 3000);
        return
    }

    router.replace('/');
    //TODO NAVEGAR A LA PANTALLA DE USUARIO
  }

  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{width: 350, padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Iniciar Sesion</Typography>
                        <Chip 
                            label="No reconocemos ese usuario / contraseña"
                            color="error"
                            icon={<ErrorOutline />}
                            className="fadeIn"
                            sx={{display: showError ? 'flex': 'none'}}
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
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                })
                            }
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        {}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Contraseña"
                            variant="filled"
                            type="password"
                            fullWidth
                            {
                                ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: {value: 6, message:'Minimo 6 caracteres'}
                                })
                            }
                            error={!!errors.password}
                            helperText={errors.password?.message}                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" size="large" fullWidth type="submit">
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                        <NextLink href="/auth/register " passHref>
                            <Link underline='always'>
                                No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default LoginPage