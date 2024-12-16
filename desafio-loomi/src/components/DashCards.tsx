export default function DashCards(props: any) {
  return (
    <div className="top-[192px] left-[144px] w-[236px] h-[168px] bg-white rounded-[15px] opacity-100 flex flex-col justify-center items-center p-4 space-y-6 mb-4">
      <h3 className="top-[217px] left-[160px] w-[192px] h-[18px] text-left font-ubuntu font-bold text-[16px] leading-[18px] tracking-normal text-[#4E5D66] opacity-100">
        {props.titulo}
      </h3>
      <h4 className="top-[280px] left-[160px] w-[128px] h-[16px] text-left font-ubuntu font-normal text-[14px] leading-[16px] tracking-normal text-[#109E8E] opacity-100">
        {props.subtitulo}
      </h4>
      <span className="flex items-center space-x-2">
        <h4 className="text-left font-ubuntu font-normal text-base leading-[24px] tracking-normal text-[#4E5D66] opacity-100">
          R$
        </h4>
        <h4 className="text-left font-ubuntu font-bold text-[20px] leading-[24px] tracking-normal text-[#4E5D66] opacity-100">
          {props.valor}
        </h4>
      </span>
    </div>
  );
}
