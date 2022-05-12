import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '../../../database';

export default NextAuth({
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET,
        }),
        //ADD MORE PROVIDERS

        Credentials({
            name:'Custom Login',
            credentials:{
                email:{label:'Correo', type:'email', placeholder:'correo@gmail.com'},
                password:{label:'Password', type:'password', placeholder:'Password'},
            },
            async authorize(credentials){
               return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
            }
        })
    ],
    //CUSTOM PAGES
    pages:{
        signIn: '/auth/login',
        newUser: '/auth/register'
    },
    session:{
        maxAge:2592000,
        strategy:'jwt',
        updateAge:8600,
    },
    //CALLBACKS
    jwt:{
        //secret:process.env.JWT_SECRET_SEED
    },
    callbacks:{
        async jwt({token, account, user}){

            if(account){
                token.accessToken = account.access_token;
                switch (account.type) {
                    case 'oauth':
                        token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
                    case 'credentials':
                        token.user = user;
                        break;
                }
            }

            return token;
        },
        async session({session, token, user}){

            session.accessToken = token.access_token;

            session.user = token.user as any;

            return session;
        },
    }
})