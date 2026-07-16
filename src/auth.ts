import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import connectDb from "@/lib/db";
import Admin from "@/models/Admin";

export const { handlers,signIn,signOut,auth} = NextAuth({
    providers:[
        Credentials({
            credentials : {
                username : {label : "Username"},
                password : {label : "Password",type:"password"},
            },
            async authorize(credentials, request) {
                try {
                    await connectDb();
                    const username = credentials.username
                    const password = credentials.password as string
                    const admin = await Admin.findOne({username})
                    if(!admin){
                        throw new Error("admin doesn't exist")
                    }
                    const isMatch = await bcrypt.compare(password,admin.password)
                    if(!isMatch){
                        throw new Error("incorrect pasword ")
                    }
                    return {
                        id:admin._id,
                        username:admin.username,
                        name:admin.name,
                        role:admin.role

                    }
                } catch (error) {
                    return null;
                }
            },
        })
    ],
    callbacks:{
        jwt({token,user}){
            if(user){
                token.id=user.id,
                token.username = user.username,
                token.name=user.name,
                token.role = user.role
            }
            return token
        },
        session({session,token}){
        if(session.user){
            session.user.id = token.id  as string,
            session.user.username = token.username as string,
            session.user.name = token.name as string,
            session.user.role = token.role as string
        }
        return session
    },
    },
    pages:{
        signIn:"/admin/login",
        error:"/login"
    },
    session:{
        strategy:"jwt",
        maxAge:10*24*60*60
        },
    secret:process.env.AUTH_SECRET
   
})

