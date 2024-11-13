import { Poppins, Roboto } from "next/font/google";

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
});

export const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
});
