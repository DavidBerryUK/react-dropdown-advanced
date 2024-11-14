import React, { useEffect, useRef } from "react";
import OptionApiModel from "../../../models/OptionApiModel";

interface IProperties {
  item: OptionApiModel;
  highlighted?: boolean;
  onSelected: (item: OptionApiModel) => void;
}

const DropDownItem: React.FC<IProperties> = ({ item, highlighted, onSelected }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSelect = () => {
    onSelected(item);
  };

  useEffect(() => {
    if (highlighted) {
      ref.current?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
      });
    }
  }, [highlighted]);

  const className = `option-item ${highlighted ? "highlighted" : ""}`;

  return (
    <div ref={ref} className={className} onClick={handleSelect}>
      {item.text}
    </div>
  );
};

export default DropDownItem;
