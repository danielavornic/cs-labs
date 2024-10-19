import React, { useState } from "react";
import Sticky from "react-sticky-el";
import EncryptionForm from "./components/encryption-form";
import FrequencyAnalysis from "./components/frequency-analysis";
import SubstitutionTool from "./components/substitution-tool";
import { analyzeFrequency } from "./lib/criptanalysis";
import { FrequencyData } from "./types";

const App: React.FC = () => {
  const [encryptedText, setEncryptedText] = useState("");
  const [frequencyData, setFrequencyData] = useState<FrequencyData[]>([]);
  const [substitutions, setSubstitutions] = useState<Record<string, string>>(
    {}
  );

  const handleAnalyze = (text: string) => {
    setEncryptedText(text);
    setFrequencyData(analyzeFrequency(text));
  };

  const handleSubstitution = (newSubstitutions: Record<string, string>) => {
    setSubstitutions(newSubstitutions);
  };

  const handleReset = () => {
    setFrequencyData([]);
    setSubstitutions({});
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Mono-alphabetic Substitution</h1>

      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-10">
          <EncryptionForm onAnalyze={handleAnalyze} onReset={handleReset} />
          {frequencyData.length > 0 && (
            <FrequencyAnalysis frequencyData={frequencyData} />
          )}
        </div>
        <Sticky stickyClassName="mt-1">
          {frequencyData.length > 0 && (
            <SubstitutionTool
              frequencyData={frequencyData}
              encryptedText={encryptedText}
              substitutions={substitutions}
              onSubstitution={handleSubstitution}
            />
          )}
        </Sticky>
      </div>
    </div>
  );
};

export default App;
