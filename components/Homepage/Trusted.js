import React from "react";
import Image from "next/image";

export default function Trusted() {
  const logos = [
    { src: "/image/google logo.webp", alt: "Google" },
    { src: "/image/Logonetflix.png", alt: "Microsoft" },
    { src: "/image/microsoft_PNG3.png", alt: "Amazon" },
    { src: "/image/amazon.webp", alt: "Netflix" },
    { src: "/image/adobe-logo.png,", alt: "Adobe" },
  ];

  return (
    <section className="trusted bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm font-medium text-gray-500">
          Trusted by top companies
        </p>
        <div className="mt-4 flex items-center justify-center gap-6 flex-wrap">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex items-center justify-center p-1"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={32}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
