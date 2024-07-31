"use client"

import { useForm } from "react-hook-form"

import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/input"

import { api } from '@/lib/api'

import { useRouter } from "next/navigation"

const schema = z.object({
    name:z.string().min(1, "O campo nome é obrigatório"),
    email: z.string().email("Digite um email válido.").min(1, "O email é obrigatório."),
    phone: z.string().refine((value)=>{
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value) 
    },{
        message: "O número de telefone deve estar no formato (DD) 999999999"
    }),
    address: z.string(),    
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm({userId}: {userId: string}){

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    }) 

    const router = useRouter();

    async function  handleRegisterCustomer(data: FormData){
        await api.post("/api/customer", {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        userId: userId
       })
       router.refresh();
       router.replace("/dashboard/customer")
    }


    return(
        <form className="flex flex-col mt-6 px-1" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className="mb-1 text-lg font-light">
                Nome Completo
            </label>
            <Input
            type="text"
            name="name"
            placeholder="Digite o nome completo"
            error={errors.name?.message}
            register={register}
            />

            <section className="flex flex-col sm:flex-row gap-2 w-full mx-auto mt-2 my-2">
                <div className="w-full">
                <label className="mb-1 text-lg font-light">
                Fone
                </label>
                    <Input
                    type="text"
                    name="phone"
                    placeholder="Exemplo (DD) 999990000"
                    error={errors.phone?.message}
                    register={register}
                    />
                </div>

                <div className="w-full">
                <label className="mb-1 text-lg font-light">
                Email
                </label>
                    <Input
                    type="email"
                    name="email"
                    placeholder="Digite o email"
                    error={errors.email?.message}
                    register={register}
                    />
                </div>

            </section>

            <label className="mb-1 text-lg font-light">
                Endereço Completo
            </label>
            <Input
            type="text"
            name="address"
            placeholder="Digite o endereço"
            error={errors.address?.message}
            register={register}
            />
            <button
            type="submit"
            className="bg-indigo-500 my-4 px-2 h-11 rounded text-white font-light"
            >
                Cadastrar
            </button>
        </form>
    )
}