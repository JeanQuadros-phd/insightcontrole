import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { NewCustomerForm } from "../components/form";



export default async function NewCustomer(){
    const session = await getServerSession(authOptions)
    // console.log(session);
     
     if(!session || !session.user){
         redirect("/")
     }
 
    return(
            <Container>
               <main className="flex flex-col mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/customer" className="bg-gray-900 px-3 py-1 text-white rounded flex gap-2 mx-2">
                        <IoArrowBack size={22} color="#FFF"/> Voltar                    
                    </Link>
                    <h1 className="text-3xl font-bold">Novo cliente</h1>
                </div>


                <NewCustomerForm userId={session.user.id}/>
               </main>
            </Container>
    )
}