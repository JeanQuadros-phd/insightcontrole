import Image from "next/image";

import logo from '../assets/CRM.svg'
export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
      <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
      <h1 className="font-bold mb-8 text-indigo-600 md: text-4xl">Atendimento, clientes</h1>
      <Image
      src={logo}
      alt="logo"
      width={600}
      className="max-w-sm md:max-w-xl xl:max-w-2xl"
      />
    </main>
  );
}
