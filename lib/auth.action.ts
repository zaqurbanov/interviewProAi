
'use server'

import { auth, db } from "@/firebase/admin"
import { cookies } from "next/headers"
const WEEk = 60 * 60 * 24 * 7
export async function signUp (params:SignUpParams){
    const {uid,email,name} = params

    try {
        const userRecord  = await db.collection("users").doc(uid).get()
        if(userRecord.exists){
            return {
                success:false,
                message:"User already exists"
            }
        }

        await db.collection("users").doc(uid).set({
            email,
            name
        })

        return {
            success:true,
            message:"User created successfully"
        }
    } catch (error:any) {
        console.error("Error creating user",error)

        if(error?.code=="auth/email-already-in-use"){
            return{
                success:false,
                message:"email already exists"
            } 
        }

        return {
            success:false,
            message:"Failed to create user"
        }
    }
}


export async function signIn(params:SignInParams){
    const {email,idToken} = params
    try {
            const userRecorder = await auth.getUserByEmail(email)
            if(!userRecorder){
                return {
                    success:false,
                    message:"User not found"
                }
            }

            await setSessionCookie(idToken)
    } catch (error) {
            console.log(error);
            return {
                success:false,
                message:"Failed to sign in"
            }
    }
}

export async function setSessionCookie(idToken:string){
    const cookieStore = await cookies()
    const sessionCookie = await auth.createSessionCookie(idToken,{
        expiresIn:WEEk *1000
    })
    cookieStore.set("session",sessionCookie,{
        maxAge:WEEk,
        httpOnly:true,
        secure:process.env.NODE_ENV ==="production",
        path:'/',
        sameSite:"lax"

    })
}

export async function getCurrentUser():Promise<User | null>{
        const cookieStore = await cookies()
        const sessionCookie = cookieStore.get("session")?.value
        if(!sessionCookie){
            return null
        }
        try {
                const decodedClaims  = await auth.verifySessionCookie(sessionCookie,true)
                const userRecord = await db.collection('users').doc(decodedClaims.uid).get()
                if(!userRecord.exists){
                    return null
                }
                return {
                    ...userRecord.data(),
                    id:userRecord.id
                } as User
        } catch (error) {
            console.log(error);
            return null
        }
}

export async function isAuthanticated(){
    const user  = await getCurrentUser()
    return !!user; {}  
}