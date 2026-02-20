"use client";
import { useState } from "react";
import { useRoute } from "./RouteCreator";

interface Props {
  index: number;
}

const publicDefaultCapacity: Record<string, number> = {
  Tricycle: 4,
  Jeepney: 12,
  Van: 12,
  Bus: 50,
};

const privateMaxCapacity: Record<string, number> = {
  "Walk/Bicycle": 1,
  "Car(Gas)": 5,
  "Car(Diesel)": 5,
  SUV: 7,
  "EV Car": 5,
  "Motorcycle (Less than 125cc)": 2,
};

export default function TransportSelect({ index }: Props) {
  const { waypoints, transportSelections, setTransportSelections } = useRoute();

  const [category, setCategory] = useState<string>("");
  const [occupancy, setOccupancy] = useState<number>(1);
  const [selectedFactor, setSelectedFactor] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  if (!waypoints[index] || !waypoints[index + 1]) return null;

  const updateSelection = (
    vehicleFactor: number,
    method: string,
    groupLabel: string,
    customOccupancy?: number,
  ) => {
    let finalFactor = vehicleFactor;

    if (groupLabel === "Public") {
      const defaultOcc = publicDefaultCapacity[method] || 1;
      finalFactor = vehicleFactor / defaultOcc;
    } else if (groupLabel === "Private") {
      const occ = customOccupancy || 1;
      finalFactor = vehicleFactor / occ;
    }

    const updated = [...transportSelections];
    updated[index] = { factor: finalFactor, method };
    setTransportSelections(updated);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const vehicleFactor = parseFloat(e.target.value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    const method = selectedOption.text;
    const groupLabel =
      selectedOption.parentElement?.getAttribute("label") || "";

    setCategory(groupLabel);
    setSelectedFactor(vehicleFactor);
    setSelectedMethod(method);
    setOccupancy(1);

    if (groupLabel === "Public") {
      updateSelection(vehicleFactor, method, groupLabel);
    } else if (groupLabel === "Private") {
      updateSelection(vehicleFactor, method, groupLabel, 1);
    }
  };

  const handleOccupancyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const occ = parseInt(e.target.value);
    setOccupancy(occ);

    if (selectedFactor !== null) {
      updateSelection(selectedFactor, selectedMethod, "Private", occ);
    }
  };

  const maxCapacity =
    category === "Private"
      ? privateMaxCapacity[selectedMethod] || 1
      : undefined;

  return (
    <div className="join w-full flex-wrap">
      <select
        className="select select-ghost join-item w-auto"
        defaultValue=""
        onChange={handleChange}
      >
        <option disabled hidden value="">
          Pick Mode of Transport
        </option>

        <optgroup label="Public">
          <option value="0.0405">Tricycle</option>
          <option value="0.3">Jeepney</option>
          <option value="0.18">Van</option>
          <option value="0.822">Bus</option>
        </optgroup>

        <optgroup label="Private">
          <option value="0">Walk/Bicycle</option>
          <option value="0.178">Car (Gas)</option>
          <option value="0.170">Car (Diesel)</option>
          <option value="0.250">SUV</option>
          <option value="0.104">EV Car</option>
          <option value="0.073">Motorcycle (Less than 125cc)</option>
        </optgroup>
      </select>

      {category === "Private" && (
        <input
          type="number"
          className="input input-ghost validator rounded-r-full w-28 join-item border-l border-base-300"
          required
          min="1"
          max={maxCapacity}
          value={occupancy}
          onChange={handleOccupancyChange}
        />
      )}
    </div>
  );
}
