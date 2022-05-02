import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { CartContext, UiContext } from '../../context'


export const Navbar = () => {
    const {numberOfItems} = useContext(CartContext);
    const {toggleSideMenu} = useContext(UiContext);
    const {asPath, push} = useRouter();
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')



    const onSearchTerm = () => {
        if(searchTerm.trim().length === 0)return;
        push(`/search/${searchTerm}`);
        setIsSearchVisible(false);
        setSearchTerm('');
    }


  return (
    <AppBar>
        <Toolbar>
            <NextLink href="/" passHref>
                <Link display='flex' alignItems='center'>
                    <Typography variant="h6">Teslo |</Typography>
                    <Typography sx={{ml:0.5}}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1} />

            <Box sx={{display: isSearchVisible ? 'none' : {xs: 'none', sm:'block'}}} className="fadeIn">
                <NextLink href="/category/men" passHref>
                    <Link>
                        <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href="/category/women" passHref>
                    <Link>
                        <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href="/category/kid" passHref>
                    <Link>
                        <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>Kids</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={1} />

            {/* PANTALLAS GRANDES */}
            {
                isSearchVisible 
                    ? (
                        <Input
                            sx={{display: {xs:'none', sm:'flex'}}}
                            className="fadeIn"
                            autoFocus
                            value={searchTerm}
                            onChange={(e)=> setSearchTerm(e.target.value)}
                            onKeyPress={(e)=>e.key==='Enter' ? onSearchTerm() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={()=>{
                                            setSearchTerm('');
                                            setIsSearchVisible(false);
                                        }}
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )
                    : (
                        <IconButton
                            sx={{display: {xs:'none', sm:'flex'}}}
                            className="fadeIn"
                            onClick={()=> setIsSearchVisible(true)}>
                            <SearchOutlined />
                        </IconButton>
                    )
            }


            {/* PANTALLAS PEQUE;AS */}
            <IconButton
                sx={{display:{xs:'flex', sm:'none'}}}
                onClick={toggleSideMenu}
            >
                <SearchOutlined />
            </IconButton>

            <NextLink href="/cart" passHref>
                <Link>
                    <IconButton>
                        <Badge badgeContent={numberOfItems > 5 ? '+5' : numberOfItems} color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={toggleSideMenu}>
                Menu
            </Button>
        </Toolbar>
    </AppBar>
  )
}
