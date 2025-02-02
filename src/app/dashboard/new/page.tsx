import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import prismaClient from '@/lib/prisma'


export default async function  NewTicket(){

    const session = await getServerSession(authOptions)
    // console.log(session);
     
     if(!session || !session.user){
         redirect("/")
     }

     const customers = await prismaClient.customer.findMany({
        where:{
            userId: session.user.id
        }
     })

     async function handleRegisterTicket(formData: FormData){
        "use server"

        const name = formData.get("name")
        const description = formData.get("description")
        const customerId = formData.get("customer")


        //console.log(name);
        if(!name || !description || !customerId){
            return;
        }
        await prismaClient.ticket.create({
            data:{
                name: name as string,
                description: description as string,
                customerId: customerId as string,         
                status: "ABERTO",
                userId: session?.user.id   
            }
    }
   
    )

    redirect("/dashboard");
}

    

    return (
        <Container>
          <main className="mt-9 mb-2">
          <div className="flex items-center gap-3">
                <Link href="/dashboard" className="text-white px-4 py-1 rounded bg-gray-900 flex mx-2">
                <IoArrowBack size={22} color="#FFF"/> Voltar    
                </Link>
                <h1>Novo chamado</h1>
            </div>

            <form className="flex flex-col mt-6" action={handleRegisterTicket}>
                <label className="mb-1 font-medium text-lg">Nome do Chamado</label>
                <input
                className="w-full border-2 rounded-md px-2 mb-2 h-11"
                type="text"
                placeholder="Digite o nome do chamado"
                required
                name="name"
                />

                <label className="mb-1 font-medium text-lg">Descreva o problema</label>
                <textarea
                className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
                placeholder="Digite o problema..."
                required
                name="description"
                />

                {customers.length !== 0 && (

                <>
                    <label className="mb-1 font-medium text-lg">Selecione o cliente</label>
                    <select  
                    name="customer"
                    className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white">
                    {customers.map((item)=>(

                    <option 
                    key={item.id}
                    value={item.id}>{item.name}</option>

                    ))}
                    </select>
                </>

                )}

                {customers.length === 0 &&(

                    <Link href={"/dashboard/customer/new"}>
                        Você ainda não tem nenhum cliente, <span className="text-blue-600 font-medium">Cadastrar cliente</span>
                    </Link>
                )

                }

                <button
                type="submit"
                className="bg-blue-600 text-white font-light px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={customers.length === 0 }
                >
Cadastrar
                </button>

            </form>



          </main>
        </Container>
    )
}