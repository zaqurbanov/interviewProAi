"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/auth.action"
import { useState } from "react"

const authFormSchema = (type:FormType) =>{
  
    return z.object({
        name: type ==="sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password:z.string().min(3)
    })
}
const AuthForm = ({type}:{type:FormType}) => {
  const [loading,setLoading] = useState(false)
    const router = useRouter()
    const formSchema = authFormSchema(type)
     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:""
    },

  })
 
  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof formSchema>) :Promise<void>{
  
try {
    if(type =="sign-up"){
      setLoading(true)
      const {name,email,password} = values;
      // create new user with firebase
      const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
      

      // qeydiyyatdan kecdikden sonra  firebase database e userin melumatlari gonderilir.
      const result  = await signUp({
        uid:userCredentials.user.uid,
        email,
        name:name!,
        password
      })

      if(!result?.success){
        toast.error(result?.message)
        return 
      }
        toast.success("Acoount created succes")
        router.push("/sign-in")
    }else{

      const {email,password} = values
      setLoading(true)
      const userCredentials = await signInWithEmailAndPassword(auth,email,password)
      const idToken  = await userCredentials.user.getIdToken()
      if(!idToken){
        toast.error("Failed sign in")
        return
      }
      await signIn({
        email,
        idToken
      })
        toast.success("Sign in success")
        router.push("/")
        
    }
} catch (error) {
  
    toast.error("There was an  Error ",error!)
}
  }
  const isSignIn = type==="sign-in" 
  return (
    <div className="card-border lg:min-w-[566px] p-1">

        <div className="card px-10 flex flex-col gap-6 py-14">
                <div className="flex flex-row gap-2 justify-center">
            <Image src={"/logo.svg"} alt="logo" height={"32"} width={"38"}/>
            <h2 className="text-primary-100">Int App</h2>
                </div>
                <h3>Practice With AI</h3>
        

    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-8 form">

            {!isSignIn  && <FormField
            control={form.control}
            name={"name"} 
            label="Name" 
            placeholder="Your name"
             type="text"/>}

            <FormField 
            control={form.control} 
            name={"email"} 
            label="Email" 
            placeholder="Your Email"
             type="email"/>

<FormField 
            control={form.control} 
            name={"password"} 
            label="Password" 
            placeholder="Your password"
             type="password"/>
      <Button type="submit" className="btn" disabled = {loading}> { isSignIn ? "Sign in " : "Create Account"}</Button>
    </form>
  </Form>

  <p className="text-center">
    {isSignIn ? 'No account yet?':'Have an account already?'}
    <Link href={!isSignIn ? '/sign-in':'/sign-up'} className="font-bold text-user-primary ml-1">
    

            {!isSignIn ? "Sign in" : "Sign up"}
    
    </Link>
  </p>
    </div>
    </div>
  )
}

export default AuthForm
