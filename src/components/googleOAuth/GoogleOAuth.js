import React from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode"


export default function GoogleOAuth() {
    const cookies = new Cookies()
  return (
    <div>
        <GoogleOAuthProvider clientId='633562319440-uco8t9cu9rdu5ak5j7ugc7alrvc6oq8s.apps.googleusercontent.com'>
            <GoogleLogin
            onSuccess={credentialResponse =>{
                const credentialResponseDecode = jwtDecode(credentialResponse.credential)
                cookies.set('email',credentialResponseDecode.email,{
                    secure: true,
                    sameSite: 'None',
                    path: '/'
                })
                //console.log(CredentialResponse);
                cookies.set('nombres',credentialResponseDecode.name,{
                    secure: true,
                    sameSite: 'None',
                    path: '/'
                })
                window.location.hash = '/sesion'
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            />
        </GoogleOAuthProvider>
      
    </div>
  )
}