
import {NextResponse} from "next/server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import  prismaClient  from "@/lib/prisma";


import { redirect } from "next/navigation";

export async function GET(request: Request){
   
    const {searchParams} = new URL(request.url);
    const customerEmail = searchParams.get("email")

    if(!customerEmail || customerEmail === ""){
        return NextResponse.json({error:"Customer not found"}, {status: 400})
    }

    try {
        const customer = await prismaClient.customer.findFirst({
            where:{
                email: customerEmail // as string
            }
        })
        return NextResponse.json(customer);
return NextResponse.json({ message: "Cliente deletado com sucesso!"})

    } catch (error) {
        return NextResponse.json({error:"Customer not found"}, {status: 400})
    }

}

//rota para deletar um cliente
export async function DELETE(request: Request){

    const session = await getServerSession(authOptions)
    
    if(!session || !session.user){
        return NextResponse.json({error:"Not authorized"}, {status: 401})
        redirect("/")
    }


    const {searchParams} = new URL(request.url);
    // localhost:3000/api/customer?id=123
    const userId = searchParams.get("id")
    
    if(!userId){
        return NextResponse.json({error:"Failed delete customer"}, {status: 400})
    }

    const findTickets = await prismaClient.ticket.findFirst({
          where:{
            customerId:userId
          }
        })
 
    if(findTickets){ //verificar se é "!"
        return NextResponse.json({ error: "Failed delete customer"}, {status: 400})
    }

    try {
        await prismaClient.customer.delete({
            where:{
                id: userId as string
            }
        })
return NextResponse.json({ message: "Cliente deletado com sucesso!"})

    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Failed delete customer"}, {status: 400})
    }

        return NextResponse.json({ok:true})
}


//rota para cadastrar um cliente
export async function POST(request: Request){

    const session = await getServerSession(authOptions)
    console.log(session);
    
    if(!session || !session.user){
        return NextResponse.json({error:"Not authorized"}, {status: 401})
        redirect("/")
    }

    const { name, email, phone, address , userId} = await request.json();
   try {
    await prismaClient.customer.create({
        data:{
            name,
            phone,
            email,
            address: address? address : "",
            userId: userId
        }

    })

    return NextResponse.json({message: "cliente cadastrado com sucesso!"})
    
   } catch (error) {
    return NextResponse.json({error:"Failed to create new customer"}, {status: 400})
   }
    

}