import React from 'react'
import { useUserAuth } from '../../firebase_setup/auth/UserAuthContext'
import MainPage from './MainPage';
import { useRouter } from 'next/router';

export default function ProtectedRoutes({ children }) {

    let { user } = useUserAuth();
    const router = useRouter();

    if (!user) {
        alert("Please login/signin first")
        router.push("/login")
    }
    else {
        return children;
    }

}
