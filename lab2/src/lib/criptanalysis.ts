import { FrequencyData } from "../types";

export const ENGLISH_FREQUENCY: FrequencyData[] = [
  { character: "E", frequency: 12.7 },
  { character: "T", frequency: 9.06 },
  { character: "A", frequency: 8.17 },
  { character: "O", frequency: 7.51 },
  { character: "I", frequency: 6.97 },
  { character: "N", frequency: 6.75 },
  { character: "S", frequency: 6.33 },
  { character: "H", frequency: 6.09 },
  { character: "R", frequency: 5.99 },
  { character: "D", frequency: 4.25 },
  { character: "L", frequency: 4.03 },
  { character: "C", frequency: 2.78 },
  { character: "U", frequency: 2.76 },
  { character: "M", frequency: 2.41 },
  { character: "W", frequency: 2.36 },
  { character: "F", frequency: 2.23 },
  { character: "G", frequency: 2.02 },
  { character: "Y", frequency: 1.97 },
  { character: "P", frequency: 1.93 },
  { character: "B", frequency: 1.49 },
  { character: "V", frequency: 0.98 },
  { character: "K", frequency: 0.77 },
  { character: "J", frequency: 0.15 },
  { character: "X", frequency: 0.15 },
  { character: "Q", frequency: 0.1 },
  { character: "Z", frequency: 0.07 },
];

export const analyzeFrequency = (encryptedText: string): FrequencyData[] => {
  const frequencyMap: Record<string, number> = {};
  const totalChars = encryptedText.length;

  for (const char of encryptedText) {
    if (char.match(/[a-zA-Z]/)) {
      const upperChar = char.toUpperCase();
      frequencyMap[upperChar] = (frequencyMap[upperChar] || 0) + 1;
    }
  }

  return Object.entries(frequencyMap)
    .map(([character, count]) => ({
      character,
      frequency: (count / totalChars) * 100,
    }))
    .sort((a, b) => b.frequency - a.frequency);
};

export const applySubstitutions = (
  encryptedText: string,
  substitutions: Record<string, string>
): Array<{ value: string; substituted: boolean }> => {
  return encryptedText.split("").map((char) => {
    const upperChar = char.toUpperCase();

    if (substitutions[upperChar]) {
      return { value: substitutions[upperChar], substituted: true };
    }

    return { value: char, substituted: false };
  });
};
