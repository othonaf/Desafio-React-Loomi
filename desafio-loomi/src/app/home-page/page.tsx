import Dashboard from "@/components/dashboard";
import Navbar from "@/components/navbar";
import backg from "@/assets/Curve-patterns.svg";

export default function StartPage() {
  return (
    // <nav className="fixed top-0 left-0 w-full h-20 bg-white shadow-md z-50 flex items-center justify-between px-4">
    //   {" "}
    //   <div className="flex items-center">
    //     {" "}
    //     <Image
    //       src={logo}
    //       alt="Logo"
    //       width={60}
    //       height={60}
    //       className="object-contain"
    //     />{" "}
    //   </div>{" "}
    //   <div className="flex items-center space-x-4">
    //     {" "}
    //     <span className="text-xl font-bold">{loggedUser}</span>{" "}
    //     <div className="flex items-center justify-center w-10 h-10 bg-[#5A4CA7] rounded-full opacity-55">
    //       {" "}
    //       <span
    //         className="text-center text-2xl font-medium text-[#4E5D66] uppercase"
    //         style={{
    //           font: "normal normal medium 22px/26px Ubuntu",
    //           letterSpacing: "-0.44px",
    //         }}
    //       >
    //         {" "}
    //         {firstChar}{" "}
    //       </span>{" "}
    //     </div>{" "}
    //   </div>{" "}
    // </nav>

    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundImage: `url(${backg.src})`, backgroundSize: "cover" }}
    >
      <Navbar />
      <div className="container mx-auto p-4">
        {" "}
        <h1 className="text-2xl font-bold mb-4">
          Dashboard
        </h1>
        <Dashboard />{" "}
      </div>
    </div>
  );
}
