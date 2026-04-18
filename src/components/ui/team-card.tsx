import Image from "next/image";
import type { TeamMember } from "@/types/site";

interface TeamCardProps {
  member: TeamMember;
  featured?: boolean;
}

export function TeamCard({ member, featured = false }: TeamCardProps) {
  return (
    <article className={`team-card ${featured ? "team-card--featured" : ""}`}>
      <div className="team-card__image-wrap">
        <Image alt={member.name} className="team-card__image" height={1200} src={member.image} width={900} />
      </div>
      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </article>
  );
}
