import Link from "next/link";
import clsx from "clsx";

export function BrandLogo({ light = false }) {
  return (
    <Link className="brand-logo" href="/" aria-label="AmarToy home">
      <span className={clsx("brand-logo__word", light && "brand-logo__word--light")}>
        <span>A</span>
        <span>m</span>
        <span>a</span>
        <span>r</span>
        <span>T</span>
        <span>o</span>
        <span>y</span>
      </span>
      <span className={clsx("brand-logo__tag", light && "brand-logo__tag--light")}>
        Toys and Games
      </span>
    </Link>
  );
}
