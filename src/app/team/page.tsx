import { team, pageBanners } from "@/data/site";
import { AboutSplit } from "@/components/sections/about-split";
import { PageHero } from "@/components/ui/page-hero";
import { TeamCard } from "@/components/ui/team-card";

export default function TeamPage() {
  return (
    <>
      <PageHero
        {...pageBanners.team}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Team" },
        ]}
      />

      <section className="section section-alt">
        <div className="container">
          <div className="grid-4">
            {team.map((member, index) => (
              <TeamCard featured={index === 1} key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <AboutSplit />
    </>
  );
}
