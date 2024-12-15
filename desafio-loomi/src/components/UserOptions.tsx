import person from "../assets/person.svg";
import Image from "next/image";

export default function UserOptions() {
  return (
    <div className="absolute top-[60px] right-0 w-[186px] h-[119px] bg-[#4E5D66] rounded-[13px] opacity-100 backdrop-blur-[15px] z-50 p-4">
      <div className="flex items-center">
        <Image
          src={person}
          alt="Profile Icon"
          width={18}
          height={20}
          className="object-contain"
        />
        <p className="ml-2 text-left text-[16px] leading-[19px] font-raleway tracking-[0.32px] text-white opacity-100">
          Editar Perfil
        </p>
      </div>
      <div>
        <p className="ml-2 text-left text-[16px] leading-[19px] font-raleway tracking-[0.32px] text-white opacity-100">
          Sair
        </p>
      </div>
    </div>
  );
}
