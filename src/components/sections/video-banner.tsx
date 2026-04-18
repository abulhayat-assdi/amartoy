import Image from "next/image";

export function VideoBanner() {
  return (
    <section className="section video-banner">
      <div className="container">
        <div className="video-banner__frame">
          <Image
            alt="Happy kids playing together"
            className="video-banner__image"
            height={780}
            sizes="100vw"
            src="/images/home/kids-banner.svg"
            width={1920}
          />
        </div>
      </div>
    </section>
  );
}
