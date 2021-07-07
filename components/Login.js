import React from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/client'
const Login = () => {
    return (
        <div className='grid place-items-center'>
            <Image src="https://links.papareact.com/t4i" height={400} width={400} objectFit="contain" alt="" />
            <h1 onClick={signIn} className='fbBtn'>Facebook - ээр нэвтрэх </h1>
        </div>
    )
}

export default Login
