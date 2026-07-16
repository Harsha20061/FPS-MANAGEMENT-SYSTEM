declare module "next-auth" {
    interface User{
        id:string,
        username:string,
        name:string,
        role:string,
    }
}   
export {}