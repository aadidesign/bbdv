import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { VideoGrid } from "@/components/sections/home/VideoGrid";
import { youtubeChannel } from "@/content/videos";

export function VideosStrip() {
  return (
    <Section className="bg-cream">
      <div className="container-bbdv">
        <SectionHeading
          eyebrow="See for yourself"
          title="Inside the clinic and the experience"
          subtitle="Real videos from our partner clinic's channel, so you can get a feel for the care, the team and the results before you ever pick up the phone."
        />

        <div className="mt-14">
          <VideoGrid limit={6} />
        </div>

        <Reveal direction="up" className="mt-10 text-center">
          <a href={youtubeChannel} target="_blank" rel="noopener noreferrer" className="font-medium text-magenta hover:underline">
            Watch more on YouTube
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
