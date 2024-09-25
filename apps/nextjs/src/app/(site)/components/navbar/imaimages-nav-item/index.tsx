import Link from "next/link";

import {
  FileImageIcon,
  ImageDownloadIcon,
} from "@voiceai/ui/@/components/ui/icons";

export default function ImagesNavItem() {
  return (
    <Link
      href="/image-generator"
      className="flex cursor-pointer flex-col items-center"
    >
      <div className="mb-2">
        <FileImageIcon className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
        <ImageDownloadIcon className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-0 transition-opacity  duration-300 group-hover:opacity-100" />
      </div>
      <span className=" font-poppins text-base font-medium">Image</span>
      <span className=" font-poppins text-base font-medium">Creator</span>
    </Link>
  );
}
