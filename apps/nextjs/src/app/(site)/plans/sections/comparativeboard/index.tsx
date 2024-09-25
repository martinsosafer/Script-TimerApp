import Image from "next/image";

import ComparativeTable from "../../../../../../public/CoProducerTable1.svg";

export default function ComparativeBoard() {
  return (
    <div className=" w-full max-w-[1060px] items-center rounded-xl bg-white  text-center ">
      {/* The image goes HERE */}
      <div className="ml-12 flex justify-center">
        <Image
          src={ComparativeTable}
          alt="Comparative Table"
          className="h-[700px] w-[1400px]" // Tailwind utilities for width and height
        />
      </div>
    </div>
  );
}
