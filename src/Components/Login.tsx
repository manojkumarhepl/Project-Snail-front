import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import bg from "../assets/images/bg.jpg"
import authService from '../Services/authService'

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters")
})
type LoginForm = z.infer<typeof loginSchema>
const Login = () => {
    const [error, setError] = useState("")
    const {
        control,
        handleSubmit,
        reset,
        formState:{errors},
    } = useForm<LoginForm>({resolver:zodResolver(loginSchema)})
    const onSubmit = async (data:LoginForm) => {
        try {
            const response = await authService.login(data)
            console.log("Login successful:", response);
            reset();
        } catch (error) {
            setError("Invalid email or password");
        }
    }
  return (
    <>
    <Box sx={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
        <Container maxWidth="xs" sx={{ padding: "2em",height:"500px",marginRight:"2em", backgroundColor: 'white', borderRadius: 2, boxShadow: "10px"}}>
            <Box sx={{mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant='h5' sx={{ fontSize: '1.5em' }}>Login</Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({field})=>(
                            <TextField
                                {...field}
                                label="Email"
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                sx={{ fontSize: '1em' }}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField 
                                {...field} 
                                type="password" 
                                label="Password" 
                                fullWidth 
                                margin="normal" 
                                error={!!errors.password} 
                                helperText={errors.password?.message} 
                                sx={{ fontSize: '1em' }}
                            />
                        )}
                    />
                    {error && <Typography color="error" sx={{ fontSize: '1em' }}>{error}</Typography> }
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth sx={{ mt: 2, fontSize: '1em' }}
                    >
                        Sign In
                    </Button>
                </form>
            </Box>
        </Container>
        </Box>
    </>
  )
}

export default Login