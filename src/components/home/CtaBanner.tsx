"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";

export const CtaBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section variant="charcoal" className="text-center overflow-hidden grain-overlay">
      {/* Aurora glow inside dark section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb"
          style={{
            width: "80%", height: "80%",
            top: "-20%", left: "10%",
            background: "radial-gradient(circle, rgba(183,154,91,0.12) 0%, rgba(183,154,91,0.05) 50%, transparent 75%)",
            animation: "aurora-drift 20s ease-in-out infinite",
          }}
        />
        <div className="aurora-orb"
          style={{
            width: "50%", height: "50%",
            bottom: "-15%", right: "5%",
            background: "radial-gradient(circle, rgba(232,213,208,0.08) 0%, transparent 70%)",
            animation: "aurora-drift-b 25s ease-in-out infinite",
          }}
        />
      </div>

      <Container size="narrow" className="relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold font-medium">
            Your Royal Celebration Awaits
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ivory tracking-tight leading-tight">
            Let Us Craft Your{" "}
            <span className="text-gold-gradient italic">Royal Wedding</span>{" "}
            Celebration
          </h2>

          <div className="flex justify-center">
            <Divider variant="ornamental" className="text-gold/50" />
          </div>

          <p className="font-sans text-base sm:text-lg text-ivory/75 font-light max-w-xl mx-auto leading-relaxed">
            We curate a select number of luxury palace and destination weddings each season across India,
            ensuring undivided devotion, opulent floral artistry, and seamless coordination for your family.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <Button href="/contact" variant="outline" className="border-gold text-ivory hover:bg-gold/20" size="lg">
              Begin Planning
            </Button>
            <Button href="/packages" variant="text" className="text-ivory/80 hover:text-gold" size="lg">
              View Royal Packages &amp; Services
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};
