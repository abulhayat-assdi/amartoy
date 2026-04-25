import Link from "next/link";
import clsx from "clsx";

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
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt={brandName} style={{ height: "48px", width: "auto", maxHeight: "48px", objectFit: "contain", display: "block" }} />
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
