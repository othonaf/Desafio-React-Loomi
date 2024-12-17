import Image from "next/image";
import buy from "@/assets/Buy.svg";
import person from "@/assets/person.svg";
import cat from "@/assets/cat.svg";
import log from "@/assets/log.svg";
import menu from "@/assets/menu.svg";
import services from "@/assets/services.svg";
import home from "@/assets/home.svg";
import retroceder from "@/assets/retroceder.svg";
import card from "@/assets/card.svg";
import text from "@/assets/text.svg";
import gear from "@/assets/gear.svg";
import { useState } from "react";

export default function SideBar() {
  const [menuIcon, setMenuIccon] = useState(menu)

  return (
    <div className="absolute w-[88px] h-[964px] bg-white top-[100px] left-[-4] shadow-[0px_3px_6px_#00000029] rounded-lg flex flex-col items-center py-5 z-50 transition-[width] duration-300 ease-in-out hover:w-[250px] group"
    onMouseEnter={() => setMenuIccon(retroceder)}
    onMouseLeave={() => setMenuIccon(menu)}
    >
      <div className="flex items-center w-full text-left px-5 py-2.5 transition-colors duration-300 hover:bg-[#EDA268] hover:border hover:border-[#EDA268] hover:rounded-md hover:cursor-pointer">
        <Image src={menuIcon} alt="Menu" width={40} height={40} />
        <span className="hidden group-hover:inline-block ml-2 text-left font-ubuntu text-[22px] leading-[30px] tracking-[0.44px] text-[#4E5D66]">Fechar</span>
      </div>
      <div className="flex items-center w-full text-left px-5 py-2.5 transition-colors duration-300 hover:bg-[#EDA268] hover:border hover:border-[#EDA268] hover:rounded-md hover:cursor-pointer">
        <Image src={home} alt="Home" width={40} height={40} />
        <span className="hidden group-hover:inline-block ml-2 text-left font-ubuntu text-[22px] leading-[30px] tracking-[0.44px] text-[#4E5D66]">Início</span>
      </div>
      <div className="flex items-center w-full text-left px-5 py-2.5 transition-colors duration-300 hover:bg-[#EDA268] hover:border hover:border-[#EDA268] hover:rounded-md hover:cursor-pointer">
        <Image src={cat} alt="Catálogo" width={40} height={40} />
        <span className="hidden group-hover:inline-block ml-2 text-left font-ubuntu text-[22px] leading-[30px] tracking-[0.44px] text-[#4E5D66]">Catálogo</span>
      </div>
      <div className="flex items-center w-full text-left px-5 py-2.5 transition-colors duration-300 hover:bg-[#EDA268] hover:border hover:border-[#EDA268] hover:rounded-md hover:cursor-pointer">
        <Image src={services} alt="Serviços" width={40} height={40} />
        <span className="hidden group-hover:inline-block ml-2 text-left font-ubuntu text-[22px] leading-[30px] tracking-[0.44px] text-[#4E5D66]">Serviços</span>
      </div>
      <div className="flex items-center w-full text-left px-5 py-2.5 transition-colors duration-300 hover:bg-[#EDA268] hover:border hover:border-[#EDA268] hover:rounded-md hover:cursor-pointer">
        <Image src={log} alt="Logs" width={40} height={40} />
        <span className="hidden group-hover:inline-block ml-2 text-left font-ubuntu text-[22px] leading-[30px] tracking-[0.44px] text-[#4E5D66]">Logística</span>
      </div>
      <div className="flex items-center w-full text-left px-5 py-2.5 transition-colors duration-300 hover:bg-[#EDA268] hover:border hover:border-[#EDA268] hover:rounded-md hover:cursor-pointer">
        <Image src={buy} alt="Compras" width={40} height={40} />
        <span className="hidden group-hover:inline-block ml-2 text-left font-ubuntu text-[22px] leading-[30px] tracking-[0.44px] text-[#4E5D66]">Pedidos</span>
      </div>
      <div className="flex items-center w-full text-left px-5 py-2.5 transition-colors duration-300 hover:bg-[#EDA268] hover:border hover:border-[#EDA268] hover:rounded-md hover:cursor-pointer">
        <Image src={card} alt="Compras" width={40} height={40} />
        <span className="hidden group-hover:inline-block ml-2 text-left font-ubuntu text-[22px] leading-[30px] tracking-[0.44px] text-[#4E5D66]">Pagamentos</span>
      </div>
      <div className="flex items-center w-full text-left px-5 py-2.5 transition-colors duration-300 hover:bg-[#EDA268] hover:border hover:border-[#EDA268] hover:rounded-md hover:cursor-pointer">
        <Image src={text} alt="Compras" width={40} height={40} />
        <span className="hidden group-hover:inline-block ml-2 text-left font-ubuntu text-[22px] leading-[30px] tracking-[0.44px] text-[#4E5D66]">Comunicação</span>
      </div>
      <div className="flex items-center w-full text-left px-5 py-2.5 transition-colors duration-300 hover:bg-[#EDA268] hover:border hover:border-[#EDA268] hover:rounded-md hover:cursor-pointer">
        <Image src={person} alt="Usuário" width={40} height={40} />
        <span className="hidden group-hover:inline-block ml-2 text-left font-ubuntu text-[22px] leading-[30px] tracking-[0.44px] text-[#4E5D66]">Cliente</span>
      </div>
      <div className="flex items-center w-full text-left px-5 py-2.5 transition-colors duration-300 hover:bg-[#EDA268] hover:border hover:border-[#EDA268] hover:rounded-md hover:cursor-pointer">
        <Image src={gear} alt="Configurações" width={40} height={40} />
        <span className="hidden group-hover:inline-block ml-2 text-left font-ubuntu text-[22px] leading-[30px] tracking-[0.44px] text-[#4E5D66]">Configurações</span>
      </div>
    </div>
  );
}
