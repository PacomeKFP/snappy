// File: app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import img from "@/assets/phones.png";

export default function HomePage() {
  return (
    <section className="flexCenter w-full flex-col pb-[100px]">
      <div className="max-container relative flex w-full  flex-col justify-between gap-32 overflow-hidden bg-green-90 bg-pattern bg-cover bg-center bg-no-repeat px-6 py-12 text-white sm:flex-row sm:gap-12 sm:py-24 lg:px-20 xl:max-h-[598px] 2xl:rounded-5xl;">
        <div className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-12">
          <h2 className=" text-8xl  bold-40 lg:bold-64 xl:max-w-[320px]">
            Bienvenue sur Snappy
          </h2>

          <div className="flex w-full flex-col gap-3 whitespace-nowrap xl:flex-row">
            <div className=" bg-gray-700 border-2 rounded-lg border-snappy-white px-6 py-2">
              <Link
                href="/login"
                className="block px-6 py-2 bg-snappy-first-blue text-snappy-white rounded-md hover:bg-snappy-second-blue transition duration-300"
              >
                Se connecter
              </Link>
            </div>

            <div  className=" bg-gray-700 border-2 rounded-lg border-snappy-white px-6 py-2">
              <Link
                href="/register"
                className="block px-6 py-2 bg-snappy-first-blue text-snappy-white rounded-md hover:bg-snappy-second-blue transition duration-300"
              >
                S&apos;inscrire
              </Link>
            </div>

            <div  className=" bg-gray-700 border-2 rounded-lg border-snappy-white px-6 py-2">
              <Link
                href="/chat"
                className="block px-6 py-2 bg-snappy-first-blue text-snappy-white rounded-md hover:bg-snappy-second-blue transition duration-300"
              >
                Accéder au chat
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <Image src={img} alt="phones" width={550} height={870} />
        </div>
      </div>
    </section>
  );
}
