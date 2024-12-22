"use client";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { FeatureCollection, Feature, Geometry } from "geojson";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import geoJsonData from "@/desafio-front-2.json";
import axios from "axios";
import Navbar from "@/components/navbar";
import SideBar from "@/components/SideBar";

interface OrderData {
  value: number;
  growth: number;
}

const DeliveryMap = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const geoJsonLayerRef = useRef<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://628bf017667aea3a3e387e51.mockapi.io/orders-month"
        );
        setOrderData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  // Atualiza os tooltips quando orderData mudar
  useEffect(() => {
    if (geoJsonLayerRef.current && orderData) {
      const layer = geoJsonLayerRef.current;
      layer.eachLayer((sublayer: any) => {
        const tooltipContent = `
          <div class="bg-white p-4 rounded-lg shadow-lg">
            <p class="text-gray-700">Pedidos realizados no mês</p>
            <p class="text-lg font-bold">${orderData.value} pedidos</p>
            <p class="text-green-500">+${orderData.growth}% em relação a julho</p>
          </div>
        `;
        sublayer.unbindTooltip();
        sublayer.bindTooltip(tooltipContent, {
          permanent: false,
          sticky: true,
          className: "custom-tooltip",
        });
      });
    }
  }, [orderData]);

  const onEachFeature = (feature: any, layer: any) => {
    layer.bindTooltip("Carregando...", {
      permanent: false,
      sticky: true,
      className: "custom-tooltip",
    });

    layer.on({
      mouseover: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          fillColor: "#4A90E2",
          fillOpacity: 0.7,
          weight: 2,
          color: "#4A90E2",
        });
        layer.bringToFront();
      },
      mouseout: (e: any) => {
        const layer = e.target;
        layer.setStyle(defaultStyle);
      },
    });
  };

  const defaultStyle = {
    fillColor: "#6366F1",
    weight: 1,
    opacity: 1,
    color: "#666",
    fillOpacity: 0.5,
  };

  return (
    <div className="min-h-screen pl-36 pt-6 flex bg-gray-50 relative overflow-x-auto mx-auto">
      <SideBar /> 
      <div className="flex-1 flex flex-col W-[1736px] pl-20 overflow-y-hidden mx-auto">
        <Navbar /> 
        <main className="flex-1 p-6 pt-24 min-w-fit relative"> 
          <div className="w-auto h-[600px] z-10">
            <MapContainer
              center={[-15.7801, -47.9292]}
              zoom={4}
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <GeoJSON
                ref={geoJsonLayerRef}
                data={geoJsonData as FeatureCollection}
                style={defaultStyle}
                onEachFeature={onEachFeature}
              />
            </MapContainer>
          </div>
        </main>
      </div>
    </div>
  );
  
};

export default DeliveryMap;
