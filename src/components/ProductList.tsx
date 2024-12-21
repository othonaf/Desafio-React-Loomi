"use client";

import Image from "next/image";
import { useState } from "react";
import banco from "@/assets/Imagem 2.png";

interface Product {
  id: number;
  name: string;
  material: string;
  colors: string[];
  status: string;
}

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto p-4">
      {/* Header com título e busca */}
      <div className="flex justify-between items-center mb-4">
      <h1 className="top-[1720px] left-[184px] w-[309px] h-[34px] text-left text-[30px] leading-[30px] font-ubuntu tracking-[0.6px] text-[#333333] opacity-100">Listagem de Produtos</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar produtos"
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            🔍
          </span>
        </div>
      </div>

      {/* Cabeçalho da tabela */}
      <div className="flex mb-2">
        <div className="w-[546px] h-[50px] bg-[#4E5D66] rounded-[9px] mr-10 flex items-center px-4">
          <span className="text-white">PRODUTO</span>
        </div>
        <div className="w-[1070px] h-[50px] bg-[#4E5D66] rounded-[9px] flex items-center px-4">
          <div className="flex justify-between w-full text-white">
            <span>CORES</span>
            <span>ESPECIFICAÇÕES</span>
            <span>STATUS</span>
          </div>
        </div>
      </div>

      {/* Lista de produtos */}
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center">
            <div className="w-[546px] mr-10 flex items-center">
              <div className="w-16 h-16 mr-4">
                <Image src={banco} alt={product.name} width={64} height={64} />
              </div>
              <h3 className="top-[1920px] left-[328px] w-[106px] h-[23px] text-left text-[20px] leading-[52px] font-ubuntu tracking-[0.8px] text-[#333333] opacity-100 whitespace-nowrap">
                {product.name}
              </h3>
            </div>
            <div className="w-[1070px] flex justify-between items-center">
              <span className="top-[1920px] left-[810px] w-[304px] h-[23px] text-left text-[20px] leading-[52px] font-ubuntu tracking-[0.8px] text-[#333333] opacity-100 whitespace-nowrap">{product.material}</span>
              
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm text-[#333333] opacity-100"
                  >
                    {color}
                  </span>
                ))}
                <span className="text-green-500">
                {product.status === "Ativo" && "✓"} {product.status}
              </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const products: Product[] = [
  {
    id: 1,
    name: "Banco Cajá",
    material: "Madeira escura, Madeira média",
    colors: ["bege", "sem braço", "cela de andar"],
    status: "Ativo",
  },
  {
    id: 2,
    name: "Banco Cajá",
    material: "Madeira escura, Madeira média",
    colors: ["bege", "sem braço", "cela de andar"],
    status: "Ativo",
  },
  {
    id: 3,
    name: "Banco Cajá",
    material: "Madeira escura, Madeira média",
    colors: ["bege", "sem braço", "cela de andar"],
    status: "Ativo",
  },
  {
    id: 4,
    name: "Banco Cajá",
    material: "Madeira escura, Madeira média",
    colors: ["bege", "sem braço", "cela de andar"],
    status: "Ativo",
  },
  {
    id: 5,
    name: "Banco Cajá",
    material: "Madeira escura, Madeira média",
    colors: ["bege", "sem braço", "cela de andar"],
    status: "Ativo",
  },
  {
    id: 6,
    name: "Banco Cajá",
    material: "Madeira escura, Madeira média",
    colors: ["bege", "sem braço", "cela de andar"],
    status: "Ativo",
  },
];
