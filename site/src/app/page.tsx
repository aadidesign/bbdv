import { Hero } from "@/components/sections/home/Hero";
import { WhyIndia } from "@/components/sections/home/WhyIndia";
import { Journey } from "@/components/sections/home/Journey";
import { VideoBand } from "@/components/sections/home/VideoBand";
import { ProceduresShowcase } from "@/components/sections/home/ProceduresShowcase";
import { PartnerClinic } from "@/components/sections/home/PartnerClinic";
import { BeforeAfterShowcase } from "@/components/sections/home/BeforeAfterShowcase";
import { ParallaxVideo } from "@/components/sections/home/ParallaxVideo";
import { SavingsStrip } from "@/components/sections/home/SavingsStrip";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { VideosStrip } from "@/components/sections/home/VideosStrip";
import { FaqTeaser } from "@/components/sections/home/FaqTeaser";
import { CtaBand } from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyIndia />
      <Journey />
      <VideoBand />
      <ProceduresShowcase />
      <PartnerClinic />
      <BeforeAfterShowcase />
      <SavingsStrip />
      <ParallaxVideo />
      <Testimonials />
      <VideosStrip />
      <FaqTeaser />
      <CtaBand />
    </>
  );
}
