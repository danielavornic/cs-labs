import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FrequencyData } from "../types";
import { applySubstitutions } from "../lib/criptanalysis";
import { ScrollArea } from "./ui/scroll-area";

interface SubstitutionToolProps {
  frequencyData: FrequencyData[];
  encryptedText: string;
  substitutions: Record<string, string>;
  onSubstitution: (newSubstitutions: Record<string, string>) => void;
}

const SubstitutionTool: React.FC<SubstitutionToolProps> = ({
  frequencyData,
  encryptedText,
  substitutions,
  onSubstitution,
}) => {
  const [localSubstitutions, setLocalSubstitutions] = useState(substitutions);

  const sortedCharacters = useMemo(() => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const sortedFrequencyData = [...frequencyData].sort(
      (a, b) => b.frequency - a.frequency
    );
    const sortedChars = sortedFrequencyData.map((item) => item.character);
    const remainingChars = alphabet.filter(
      (char) => !sortedChars.includes(char)
    );
    return [...sortedChars, ...remainingChars];
  }, [frequencyData]);

  const encryptionAlphabet = useMemo(() => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return alphabet.map((char) => {
      const encryptedChar =
        Object.entries(localSubstitutions).find(
          ([, value]) => value === char
        )?.[0] || "-";
      return { plain: char, encrypted: encryptedChar };
    });
  }, [localSubstitutions]);

  const substitutedLettersCount = useMemo(() => {
    return Object.values(localSubstitutions).filter(Boolean).length;
  }, [localSubstitutions]);

  const handleSubstitutionChange = (
    encryptedChar: string,
    plainChar: string
  ) => {
    const upperEncryptedChar = encryptedChar.toUpperCase();
    const upperPlainChar = plainChar.toUpperCase();

    const newSubstitutions = { ...localSubstitutions };
    Object.keys(newSubstitutions).forEach((key) => {
      if (newSubstitutions[key] === upperPlainChar) {
        newSubstitutions[key] = "";
      }
    });
    newSubstitutions[upperEncryptedChar] = upperPlainChar;

    setLocalSubstitutions(newSubstitutions);
    onSubstitution(newSubstitutions);
  };

  const substitutedText = applySubstitutions(encryptedText, localSubstitutions);

  return (
    <Card>
      <ScrollArea className="h-[99dvh]">
        <CardHeader>
          <CardTitle>Character Substitution</CardTitle>
          <CardDescription>
            Replace encrypted characters with plain text
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-2">
            {sortedCharacters.map((character) => (
              <div
                key={character}
                className="flex flex-col items-center space-y-1"
              >
                <Label>{character}</Label>
                <Input
                  value={localSubstitutions[character] || ""}
                  onChange={(e) =>
                    handleSubstitutionChange(character, e.target.value)
                  }
                  maxLength={1}
                  className="text-center"
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Substituted Text</h3>
            <p className="whitespace-pre-wrap">
              {substitutedText.map((char, index) => (
                <span
                  key={index}
                  className={char.substituted ? "bg-yellow-200" : ""}
                >
                  {char.value}
                </span>
              ))}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Encryption Alphabet</h3>
            <Table>
              <TableBody>
                <TableRow>
                  {encryptionAlphabet.map(({ plain }) => (
                    <TableCell
                      key={plain}
                      className="text-center font-bold p-1"
                    >
                      {plain}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {encryptionAlphabet.map(({ plain, encrypted }) => (
                    <TableCell key={plain} className="text-center p-1">
                      {encrypted}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="mt-4">
            <p>
              <b>Substituted Letters:</b> {substitutedLettersCount} / 26
            </p>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default SubstitutionTool;
