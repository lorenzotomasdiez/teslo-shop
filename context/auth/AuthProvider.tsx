import axios from 'axios';
import Cookies from 'js-cookie';
import { FC, ReactNode, useEffect, useReducer} from 'react';
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer} from './';

export interface AuthState{
    isLoggedIn: boolean;
    user?:IUser;
}


const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user:undefined,
}

interface Props{
    children?: ReactNode
}

export const AuthProvider:FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

    useEffect(() => {
      checkTocken();
    }, [])
    
    const checkTocken = async () => {
        try {
            const {data} = await tesloApi.get('/user/validate-token');
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type:'[Auth] - Login', payload:user});
            return true;
        } catch (error) {
            Cookies.remove('token');
        }
    }

    const loginUser = async(email: string, password: string):Promise<boolean> => {
        try {
            const {data} = await tesloApi.post('/user/login', {email, password});
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type:'[Auth] - Login', payload:user});
            return true;
        } catch (error) {
            return false
        }
    }

    const registerUser = async(name:string, email:string, password:string)
        :Promise<{hasError: boolean, message?:string}> => {
        try {
            const {data} = await tesloApi.post('/user/login', {email, password});
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type:'[Auth] - Login', payload:user});

            return{
                hasError: false,
                
            }
        } catch (error) {
            if(axios.isAxiosError(error)){
                const {message} = error.response?.data as any
                return{
                    hasError:true, 
                    message
                }
            }
            return {
                hasError:true,
                message: 'No se pudo crear el usuario - intente nuevamente'
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            //methods
            loginUser,
            registerUser,
        }}>
             { children}
        </AuthContext.Provider>
    )
};