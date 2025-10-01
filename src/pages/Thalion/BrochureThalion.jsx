import React, { useRef } from "react";
import ThemeSection from "./BrochureSections/ThemeSection";
import NosSoins from "./BrochureSections/NosSoins";
import DetoxSilhouette from "./BrochureSections/DetoxSilhouette";
import RelaxationMarine from "./BrochureSections/RelaxationMarine";
import CureNoStress from "./BrochureSections/CureNoStress";
import EscaleMen from "./BrochureSections/EscaleMen";
import AfterGolf from "./BrochureSections/AfterGolf";
import ArbreVie from "./BrochureSections/ArbreVie";
import CeremonieSpa from "./BrochureSections/CeremonieSpa";
import NouvelAge from "./BrochureSections/NouvelAge";
import WeekendCool from "./BrochureSections/WeekendCool";

const BrochureThalion = () => {
  const soinsRef = useRef(null);
  const detoxRef = useRef(null);
  const relaxationRef = useRef(null);
  const cureNoStressRef = useRef(null);
  const menRef = useRef(null);
  const golfRef = useRef(null);
  const arbreRef = useRef(null);
  const ceremonieRef = useRef(null);
  const nouvelAgeRef = useRef(null);
  const weekendCoolRef = useRef(null);

  const scrollToSoins = () => {
    soinsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToDetox = () => {
    detoxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToRelaxation = () => {
    relaxationRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToCureNoStress = () => {
    cureNoStressRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToMen = () => {
    menRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToGolf = () => {
    golfRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToArbre = () => {
    arbreRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToCeremonie = () => {
    ceremonieRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToNouvelAge = () => {
    nouvelAgeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToWeekendCool = () => {
    weekendCoolRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="brochure-container">
      {/* Theme Section */}
      <div className="relative">
        <ThemeSection
          scrollToSoins={scrollToSoins}
          scrollToDetox={scrollToDetox}
          scrollToRelaxation={scrollToRelaxation}
          scrollToCureNoStress={scrollToCureNoStress}
          scrollToMen={scrollToMen}
          scrollToGolf={scrollToGolf}
          scrollToArbre={scrollToArbre}
          scrollToCeremonie={scrollToCeremonie}
          scrollToNouvelAge={scrollToNouvelAge}
          scrollToWeekendCool={scrollToWeekendCool}
        />
      </div>

      {/* NosSoins Section - Vitalité Marine */}
      <div
        ref={soinsRef}
        data-section="vitalite-marine"
        id="vitalite-marine"
        className="relative"
      >
        <NosSoins />
      </div>

      {/* DetoxSilhouette Section */}
      <div
        ref={detoxRef}
        data-section="detox-silhouette"
        id="detox-silhouette"
        className="relative"
      >
        <DetoxSilhouette />
      </div>

      {/* RelaxationMarine Section */}
      <div
        ref={relaxationRef}
        data-section="relaxation-marine"
        id="relaxation-marine"
        className="relative"
      >
        <RelaxationMarine />
      </div>

      {/* CureNoStress Section */}
      <div
        ref={cureNoStressRef}
        data-section="cure-no-stress"
        id="cure-no-stress"
        className="relative"
      >
        <CureNoStress />
      </div>

      {/* EscaleMen Section - For Men */}
      <div
        ref={menRef}
        data-section="for-men"
        id="for-men"
        className="relative"
      >
        <EscaleMen />
      </div>

      {/* AfterGolf Section */}
      <div
        ref={golfRef}
        data-section="after-golf"
        id="after-golf"
        className="relative"
      >
        <AfterGolf />
      </div>

      {/* ArbreVie Section */}
      <div
        ref={arbreRef}
        data-section="arbre-vie"
        id="arbre-vie"
        className="relative"
      >
        <ArbreVie />
      </div>

      {/* CeremonieSpa Section */}
      <div
        ref={ceremonieRef}
        data-section="ceremonie-spa"
        id="ceremonie-spa"
        className="relative"
      >
        <CeremonieSpa />
      </div>

      {/* NouvelAge Section */}
      <div
        ref={nouvelAgeRef}
        data-section="nouvel-age"
        id="nouvel-age"
        className="relative"
      >
        <NouvelAge />
      </div>

      {/* WeekendCool Section */}
      <div
        ref={weekendCoolRef}
        data-section="weekend-cool"
        id="weekend-cool"
        className="weekend-cool-section relative"
      >
        <WeekendCool />
      </div>
    </div>
  );
};

export default BrochureThalion;
