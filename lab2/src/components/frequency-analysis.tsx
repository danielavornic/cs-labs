import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FrequencyData } from "../types";
import { ENGLISH_FREQUENCY } from "@/lib/criptanalysis";

interface FrequencyAnalysisProps {
  frequencyData: FrequencyData[];
}

const FrequencyAnalysis: React.FC<FrequencyAnalysisProps> = ({
  frequencyData,
}) => {
  const chartData = ENGLISH_FREQUENCY.map((engItem) => {
    const encryptedItem = frequencyData.find(
      (item) => item.character === engItem.character
    );
    return {
      character: engItem.character,
      "Encrypted Text": encryptedItem ? encryptedItem.frequency.toFixed(2) : 0,
      "English Language": engItem.frequency,
    };
  });

  const sortedEncryptedFreq = [...frequencyData].sort(
    (a, b) => b.frequency - a.frequency
  );
  const sortedEnglishFreq = [...ENGLISH_FREQUENCY].sort(
    (a, b) => b.frequency - a.frequency
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequency Analysis</CardTitle>
        <CardDescription className="sr-only">
          Character frequency comparison between encrypted text and English
          language
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="character" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Encrypted Text" fill="#8884d8" />
              <Bar dataKey="English Language" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">
            Frequency Comparison Table
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>English Letter</TableHead>
                <TableHead>Frequency (%)</TableHead>
                <TableHead>Encrypted Text</TableHead>
                <TableHead>Frequency (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEncryptedFreq.map((item, index) => (
                <TableRow key={item.character}>
                  <TableCell>{sortedEnglishFreq[index].character}</TableCell>
                  <TableCell>
                    {sortedEnglishFreq[index].frequency.toFixed(2)}
                  </TableCell>
                  <TableCell>{item.character}</TableCell>
                  <TableCell>{item.frequency.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FrequencyAnalysis;
