import jwt from 'jsonwebtoken';

export const signToken = (_id:string, email:string) => {
    if(!process.env.JWT_SECRET_SEED)throw new Error('Theres no jwt seed');
    return jwt.sign(
        //payload
        {_id, email},

        //seed
        process.env.JWT_SECRET_SEED,

        //Options
        {expiresIn: '30d'}
    )
}

export const isValidToken = (token: string):Promise<string> => {
    if(!process.env.JWT_SECRET_SEED){
        throw new Error('No hay semilla de JWT');
    }

    if(token.length <= 10){
        return Promise.reject('jwt no es valido');
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if(err) return reject('JWT no es valido');
                const {_id} = payload as {_id: string};
                resolve(_id);
            } )
        } catch (error) {
            reject('JWT no es valido');
        }
    })
}