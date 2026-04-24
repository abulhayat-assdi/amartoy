import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

interface BrandLogoProps {
  light?: boolean;
  logoUrl?: string;
  brandName?: string;
  tagline?: string;
}

export function BrandLogo({ light = false, logoUrl, brandName = "AmarToy", tagline = "Toys and Games" }: BrandLogoProps) {
  return (
    <Link className="brand-logo" href="/" aria-label={`${brandName} home`}>
      {logoUrl ? (
        <Image src={logoUrl} alt={brandName} width={150} height={40} style={{ objectFit: "contain", height: "auto" }} priority />
      ) : (
        <>
          <span className={clsx("brand-logo__word", light && "brand-logo__word--light")}>
            {brandName.split("").map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </span>
          {tagline && (
            <span className={clsx("brand-logo__tag", light && "brand-logo__tag--light")}>
              {tagline}
            </span>
          )}
        </>
      )}
    </Link>
  );
}
