import Image from "next/image";

import Arabia from "../../flags/arabia.png";
import Australia from "../../flags/australia.png";
import China from "../../flags/china.png";
import Dinamark from "../../flags/dinamarka.png";
import Britain from "../../flags/england-flag.png";
import Spain from "../../flags/españa.png";
import Finland from "../../flags/finland.png";
import France from "../../flags/france.png";
import Germany from "../../flags/german.png";
import Dutch from "../../flags/holand.png";
import India from "../../flags/india.png";
import Indonesia from "../../flags/indonesia.png";
import Italy from "../../flags/italy.png";
import Japan from "../../flags/japon.png";
import Korea from "../../flags/koreadelsur.png";
import Norway from "../../flags/norway.png";
import Portugal from "../../flags/portugal.png";
import Brazil from "../../flags/portugal.png";
import Romania from "../../flags/romania.png";
import Russia from "../../flags/russia.png";
import Scotland from "../../flags/scotland.png";
import Turkey from "../../flags/turkey.png";
import UnitedStates from "../../flags/united-states (2).png";

const languages = [
  { name: "American English", flag: UnitedStates },
  { name: "British English", flag: Britain },
  { name: "Australian English", flag: Australia },
  { name: "German", flag: Germany },
  { name: "French", flag: France },
  { name: "Italian", flag: Italy },
  { name: "Spanish", flag: Spain },
  { name: "Russian", flag: Russia },
  { name: "Portuguese", flag: Portugal },
  { name: "Arabic", flag: Arabia },
  { name: "Hindi", flag: India },
  { name: "Chinese", flag: China },
  { name: "Japanese", flag: Japan },
  { name: "Korean", flag: Korea },
  { name: "Dutch", flag: Dutch },
  { name: "Danish", flag: Dinamark },
  { name: "Finnish", flag: Finland },
  { name: "Norwegian", flag: Norway },
  { name: "Romanian", flag: Romania },
  { name: "Turkish", flag: Turkey },
  { name: "Indonesian", flag: Indonesia },
  { name: "Cantonese Chinese", flag: China },
  { name: "Brazil Portuguese", flag: Brazil },
  { name: "Scottish", flag: Scotland },
  { name: "Indian English", flag: India },
];

export default function LanguagesRows() {
  return (
    <>
      <div className="sticky top-0 z-10  mb-5 bg-white px-4">
        <h2 className="font-poppins text-lg font-semibold text-black  md:text-xl">
          Our ai supports the following languages
        </h2>
      </div>
      <div className="container mx-auto mb-8 px-20 py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {languages.map((lang) => (
            <button
              key={lang.name}
              className="flex items-center space-x-1 rounded-md bg-slate-200 px-1 py-2 text-xs font-medium text-gray-700 transition-colors duration-200 hover:bg-slate-300"
            >
              <Image
                src={lang.flag}
                alt={`${lang.name} flag`}
                width={24}
                height={16}
                className="h-auto w-6"
              />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
