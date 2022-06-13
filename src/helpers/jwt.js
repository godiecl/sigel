import jwt from 'jsonwebtoken';

export const generarJWT = (id, nombre) =>{
 
    const payload = {id, nombre};

    return new Promise ( (resolve, reject) => {

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '4h'
        }, (err, token) =>{
            if(err){
                console.log(err);
                reject( err );
            } else{
                resolve(token);
            }
        })

    });

    
}