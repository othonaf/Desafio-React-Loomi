"use client";
import { useRouter } from "next/navigation"; //
import { BsPersonSquare } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";

export default function UserOptions() {
  const router = useRouter();
  
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

 
  return (
    <div className="flex flex-col space-y-8 absolute top-[60px] right-0 w-[186px] h-[119px] bg-[#4E5D66] rounded-[13px] opacity-100 backdrop-blur-[15px] z-50 p-4">
      <div className="flex justify-left space-x-6">
        <BsPersonSquare />
        <p className="ml-2 text-left text-[16px] leading-[19px] font-raleway tracking-[0.32px] text-white opacity-100">
          Editar Perfil
        </p>
      </div>
      <div className="flex justify-left space-x-6 cursor-pointer" onClick={handleLogout}>
        <SlLogout />
        <p className="ml-2 text-left text-[16px] leading-[19px] font-raleway tracking-[0.32px] text-white opacity-100">
          Sair
        </p>
      </div>
    </div>
  );
}
