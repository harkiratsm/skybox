import { redirect } from "next/navigation"

export default async function Settings(){
    redirect("/settings/profile")   
    return <div /> 
}