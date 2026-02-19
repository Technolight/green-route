"use client";
import { useRoute } from "./RouteCreator";

interface Props {
  index: number;
}

export default function TransportSelect({ index }: Props) {
  const { waypoints, transportSelections, setTransportSelections } = useRoute();

  if (!waypoints[index] || !waypoints[index + 1]) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const factor = parseFloat(e.target.value);
    const method = e.target.options[e.target.selectedIndex].text;

    const updated = [...transportSelections];
    updated[index] = { factor, method };

    setTransportSelections(updated);
  };

  return (
    <div className="flex items-center justify-center">
      <select
        className="select select-secondary w-1/2 mt-1.5 mb-3"
        defaultValue=""
        onChange={handleChange}
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
    </div>
  );
}
