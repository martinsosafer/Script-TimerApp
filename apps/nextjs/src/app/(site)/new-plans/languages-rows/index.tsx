import Image from "next/image";

import { roboto } from "~/app/fonts";

const languages = [
  { name: "American English", flag: "/flags/united-states (2).png" },
  { name: "British English", flag: "/flags/england-flag.png" },
  { name: "Australian English", flag: "/flags/australia.png" },
  { name: "German", flag: "/flags/german.png" },
  { name: "French", flag: "/flags/france.png" },
  { name: "Italian", flag: "/flags/italy.png" },
  { name: "Spanish", flag: "/flags/españa.png" },
  { name: "Russian", flag: "/flags/russia.png" },
  { name: "Portuguese", flag: "/flags/portugal.png" },
  { name: "Arabic", flag: "/flags/arabia.png" },
  { name: "Hindi", flag: "/flags/india.png" },
  { name: "Chinese", flag: "/flags/china.png" },
  { name: "Japanese", flag: "/flags/japon.png" },
  { name: "Korean", flag: "/flags/koreadelsur.png" },
  { name: "Dutch", flag: "/flags/holand.png" },
  { name: "Danish", flag: "/flags/dinamarka.png" },
  { name: "Finnish", flag: "/flags/finland.png" },
  { name: "Norwegian", flag: "/flags/norway.png" },
  { name: "Romanian", flag: "/flags/romania.png" },
  { name: "Turkish", flag: "/flags/turkey.png" },
  { name: "Indonesian", flag: "/flags/indonesia.png" },
  { name: "Cantonese Chinese", flag: "/flags/china.png" },
  { name: "Brazil Portuguese", flag: "/flags/portugal.png" },
  { name: "Scottish", flag: "/flags/scotland.png" },
  { name: "Indian English", flag: "/flags/india.png" },
];

export default function LanguagesRows() {
  return (
    <>
      <p className="mt-[100px] text-center text-[24px] font-bold">
        Our ai supports the following languages
      </p>

      <div className="mt-[48px] grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
        {languages.map((lang) => (
          <button
            key={lang.name}
            className="flex h-[70px] w-[164px] items-center gap-3 rounded-md bg-slate-200 px-[16px] py-[15px] text-xs font-medium text-gray-700 transition-colors duration-200 hover:bg-slate-300"
          >
            <Image
              src={lang.flag}
              alt={`${lang.name} flag`}
              width={40}
              height={20}
              //className="h-auto w-10"
            />
            <span
              className={`${roboto.className} text-left text-[14px] font-normal leading-5`}
            >
              {lang.name}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
