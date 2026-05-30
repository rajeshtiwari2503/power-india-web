 import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
   <Link href="/" className="flex items-center flex-shrink-0">
  <Image
    src="/pisLogo.png"
    alt="Power India Services"
    width={320}
    height={120}
    priority
    className="h-[60px] md:h-[70px] lg:h-[80px] w-auto"
  />
</Link>

 

  );
}