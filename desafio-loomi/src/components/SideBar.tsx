import Image from "next/image";
import buy from "@/assets/Buy.svg";
import person from "@/assets/person.svg";
import cat from "@/assets/cat.svg";
import log from "@/assets/log.svg";
import menu from "@/assets/menu.svg";
import services from "@/assets/services.svg"
import home from "@/assets/home.svg";

export default function SideBar() {
  return (
    <div className="absolute top-[100px] left-4 w-[88px] shadow-xl h-[964px] bg-white bg-no-repeat bg-[padding-box] shadow-md rounded-lg opacity-100 flex flex-col items-center py-4 space-y-4">
      {" "}
      <Image
        src={menu}
        alt="Home"
        width={40}
        color="black"
        height={40}
        className="mb-4"
      />{" "}
      <Image src={home} alt="Tools" width={40} height={40} className="mb-4" />{" "}
      <Image
        src={cat}
        alt="Layers"
        width={40}
        height={40}
        className="mb-4"
      />{" "}
      <Image src={services} alt="Truck" width={40} height={40} className="mb-4" />{" "}
      <Image src={log} alt="Buy" width={40} height={40} className="mb-4" />{" "}
      <Image
        src={buy}
        alt="Message"
        width={40}
        height={40}
        className="mb-4"
      />{" "}
      <Image src={person} alt="User" width={40} height={40} className="mb-4" />{" "}
      <Image
        src={buy}
        alt="Settings"
        width={40}
        height={40}
        className="mb-4"
      />{" "}
    </div>
  );
}
