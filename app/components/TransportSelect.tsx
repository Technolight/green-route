"use client";
import { useRoute } from "./RouteCreator";

export default function TransportSelect() {
  const { transportCO2Factor, settransportCO2Factor } = useRoute();

  return (
    <select
      className="select select-secondary w-full"
      defaultValue=""
      onChange={(e) => settransportCO2Factor(parseFloat(e.target.value))}
    >
      <option disabled value="">
        Pick Mode of Transport
      </option>
      <option value="0.0">Walk</option>
      <option value="0.0">Bicycle</option>
      <option value="0.0101">Tricycle</option>
      <option value="0.020">Jeepney</option>
      <option value="0.0275">Bus</option>
    </select>
  );
}
