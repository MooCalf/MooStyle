import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AgeGateModal } from "./AgeGateModal";
import { ConsentGateModal } from "./ConsentGateModal";
import { useSafeMode } from "@/lib/useSafeMode";

const AGE_GATE_KEY = "moostyle_age_gate_seen";
const CONSENT_KEY = "moostyle_consent_seen";

const readFlag = (key) => {
  try {
    return window.localStorage.getItem(key) === "true";
  } catch {
    return true;
  }
};

const writeFlag = (key) => {
  try {
    window.localStorage.setItem(key, "true");
  } catch {
    void 0;
  }
};

export const FirstVisitGates = () => {
  const [, , setSafeMode] = useSafeMode();
  const [step, setStep] = useState("none");

  useEffect(() => {
    if (!readFlag(AGE_GATE_KEY)) {
      setStep("age");
    } else if (!readFlag(CONSENT_KEY)) {
      setStep("consent");
    }
  }, []);

  const handleAgeAnswer = (isAdult) => {
    if (!isAdult) setSafeMode(true);
    writeFlag(AGE_GATE_KEY);
    setStep(readFlag(CONSENT_KEY) ? "none" : "consent");
  };

  const handleConsentAgree = () => {
    writeFlag(CONSENT_KEY);
    setStep("none");
  };

  return (
    <AnimatePresence mode="wait">
      {step === "age" && <AgeGateModal key="age" onAnswer={handleAgeAnswer} />}
      {step === "consent" && <ConsentGateModal key="consent" onAgree={handleConsentAgree} />}
    </AnimatePresence>
  );
};
