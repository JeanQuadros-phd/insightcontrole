import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import { CardCustomer } from "./components/card";
import prismaClient from '@/lib/prisma';

export default async function Customer(){
    const session = await getServerSession(authOptions)
   // console.log(session);
    
    if(!session || !session.user){
        redirect("/")
    }

        const customers = await prismaClient.customer.findMany({
            where: {
                userId:session.user.id
            }
        })
        
    return(


        <Container>
            <main className="mt-9 mb-2 px-1">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold ml-4">Meus clientes</h1>
                    <Link href="/dashboard/customer/new" className="bg-indigo-500 text-white px-4 py-1 rounded mr-4">Novo Cliente</Link>
                </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-4 mt-8">
 {customers.map((item)=>(
                   <CardCustomer 
                   key={item.id}
                   customer={item}
                   
                   />
 
 ))}              
            </section>
    {customers.length <1 && (

        <h1 className="text-gray-600">Você ainda não possui nenhum cliente.</h1>


    )}
            </main>
        </Container>
    )
}