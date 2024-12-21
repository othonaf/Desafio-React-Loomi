"use client";
import { SetStateAction, useState } from "react";
import Navbar from "@/components/navbar";
import SideBar from "@/components/SideBar";
import axios from "axios";

interface ProductItem {
  code: string;
  color: string;
  size: {
    width: number;
    height: number;
    length: number;
  };
}

interface ProductForm {
  code: string;
  productId: string;
  seller: string;
  deliveryDate: number;
  specificationsSubtitle: string;
  specificationsInfo: string;
  specificationsCares: string;
  categories: string[];
  tags: string[];
  id: string;
  items: ProductItem[];
}

interface Category {
  name: string;
  subcategories: string[];
}
const categories: Category[] = [
  { name: "Área externa", subcategories: ["Cadeiras", "Mesas", "Poltronas"] },
  { name: "Estofados", subcategories: [] },
  { name: "Mesas", subcategories: [] },
];

const tagsArray: Category[] = [
  {
    name: "Características",
    subcategories: ["Cadeiras", "Mesas", "Poltronas"],
  },
  { name: "Ambientes", subcategories: [] },
  {
    name: "Material",
    subcategories: [
      "Melanímico",
      "Metal Pintado",
      "Madeira Natural",
      "Vidro",
      "Tecido",
      "Tela",
    ],
  },
];

export default function CreateProduct() {
  const [formData, setFormData] = useState<ProductForm>({
    code: "",
    productId: "",
    seller: "",
    deliveryDate: 0,
    specificationsSubtitle: "",
    specificationsInfo: "",
    specificationsCares: "",
    categories: [],
    tags: [],
    id: "",
    items: [
      {
        code: "",
        color: "",
        size: { width: 0, height: 0, length: 0 },
      },
    ],
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://628bf017667aea3a3e387e51.mockapi.io/create-product",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;
      console.log(data);
      alert("Produto criado com sucesso:");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 relative overflow-x-auto mx-auto">
      <SideBar />
      <div className="flex-1 flex flex-col W-[1736px] pl-20 overflow-y-hidden mx-auto">
        <Navbar />
        <main className="flex-1 p-6 pt-24 min-w-fit">
          <h1 className="text-base text-xl mb-10 font-ubuntu text-gray-800 mb-4">
            Adicionar produto
          </h1>
          <div className="max-w-8xl mx-auto p-2 bg-white">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="space-y-4">
                <h3 className="top-[376px] left-[802px] w-[100px] h-[20px] text-left font-ubuntu font-bold text-lg tracking-[0.72px] text-[#4E5D66] opacity-100">
                    Detalhes
                  </h3>
                  <input
                    type="text"
                    placeholder="Nome"
                    className="w-full p-2 border text-gray-900 border-gray-300 rounded-md"
                    onChange={(e) =>
                      setFormData({ ...formData, productId: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="ID"
                    className="w-full p-2 border text-gray-900 border-gray-300 rounded-md"
                    onChange={(e) =>
                      setFormData({ ...formData, id: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Código"
                    className="w-full p-2 border text-gray-900 border-gray-300 rounded-md"
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Seller"
                    className="w-full p-2 border text-gray-900 border-gray-300 rounded-md"
                    onChange={(e) =>
                      setFormData({ ...formData, seller: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Prazo de entrega"
                    className="w-full p-2 border text-gray-900 border-gray-300 rounded-md"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deliveryDate: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <section id="categorias">
                  <div>
                    <h3 className="top-[376px] left-[802px] w-[100px] h-[20px] text-left font-ubuntu font-bold text-lg tracking-[0.72px] text-[#4E5D66] opacity-100">
                      Categorias
                    </h3>
                    <select
                      className="w-full p-2 border mt-8 text-gray-900 border-gray-300 rounded-md"
                      onChange={handleCategoryChange}
                    >
                      <option value="">Selecione uma categoria</option>
                      {categories.map((cat, index) => (
                        <optgroup key={index} label={cat.name}>
                          {cat.subcategories.length > 0 ? (
                            cat.subcategories.map((subcat, subIndex) => (
                              <option key={subIndex} value={subcat}>
                                {subcat}
                              </option>
                            ))
                          ) : (
                            <option value={cat.name}>{cat.name}</option>
                          )}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </section>

                <section id="Tags">
                  <div>
                    <h3 className="text-left font-ubuntu font-bold text-lg tracking-[0.72px] text-[#4E5D66]">
                      Tags
                    </h3>
                    <div className="relative mt-[-5]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsTagsOpen(!isTagsOpen);
                        }}
                        className="w-full p-2 border mt-6 text-gray-900 border-gray-300 rounded-md flex justify-between items-center"
                      >
                        <span>Selecione as tags</span>
                        <span
                          className={`transform transition-transform ${
                            isTagsOpen ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>

                      {isTagsOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg">
                          {tagsArray.map((category, index) => (
                            <div key={index}>
                              <div className="px-3 py-2 bg-gray-100 font-ubuntu font-bold text-lg tracking-[0.72px] text-[#4E5D66] opacity-100">
                                {category.name}
                              </div>
                              {category.subcategories.length > 0 && (
                                <div className="p-2 px-3 py-2 bg-gray-100 font-ubuntu font-bold text-lg tracking-[0.72px] text-[#4E5D66] opacity-100">
                                  {category.subcategories.map(
                                    (subcategory, subIndex) => (
                                      <label
                                        key={subIndex}
                                        className="flex items-center p-2 hover:bg-gray-50"
                                      >
                                        <input
                                          type="checkbox"
                                          value={subcategory}
                                          checked={formData.tags.includes(
                                            subcategory
                                          )}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setFormData((prev) => ({
                                              ...prev,
                                              tags: e.target.checked
                                                ? [...prev.tags, value]
                                                : prev.tags.filter(
                                                    (tag) => tag !== value
                                                  ),
                                            }));
                                          }}
                                          className="mr-2"
                                        />
                                        {subcategory}
                                      </label>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-medium text-gray-700">
                  Especificações
                </h3>
                <input
                  type="text"
                  placeholder="Subtítulo"
                  className="w-full p-2 border text-gray-900 border-gray-300 rounded-md"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specificationsSubtitle: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Informações"
                  className="w-full p-2 border text-gray-900 border-gray-300 rounded-md"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specificationsInfo: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Limpeza e cuidados"
                  className="w-full p-2 border text-gray-900 border-gray-300 rounded-md"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specificationsCares: e.target.value,
                    })
                  }
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-700">Itens</h3>
                  <button type="button" className="text-gray-600">
                    + Adicionar
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Código"
                    className="w-full p-2 border text-gray-900 border-gray-300 rounded-md"
                  />
                  <select className="w-full p-2 border text-gray-900 border-gray-300 rounded-md">
                    <option value="">Selecione a cor</option>
                  </select>
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="number"
                      placeholder="m x"
                      className="p-2 border text-gray-900 border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="m x"
                      className="p-2 border text-gray-900 border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="m"
                      className="p-2 border text-gray-900 border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <span>Imagens:</span>
                    <button
                      type="button"
                      className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-100 rounded-md font-ubuntu text-[#18181a]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C0D7E5] rounded-md font-ubuntu text-[#18181a]"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
