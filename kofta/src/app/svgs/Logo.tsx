import * as React from "react";
import lotus from "../../assets/lotus.png";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center rounded-full bg-simple-gray-2b p-2 shadow-lg">
      <img src={lotus} className="w-16 mr-6" alt=""/>
      <div className="text-center text-3xl font-mono select-none text-simple-gray-69">Goloka Vrindavan</div>
    </div>
  );
}
