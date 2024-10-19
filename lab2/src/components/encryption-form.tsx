import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  encryptedText: z.string().min(1, {
    message: "Encrypted text must not be empty.",
  }),
});

interface EncryptionFormProps {
  onAnalyze: (text: string) => void;
  onReset: () => void;
}

const EncryptionForm: React.FC<EncryptionFormProps> = ({
  onAnalyze,
  onReset,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      encryptedText: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAnalyze(values.encryptedText);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Encrypted Text</CardTitle>
        <CardDescription className="sr-only">
          Enter the encrypted text to analyze
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="encryptedText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Encrypted Text</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[400px]"
                      placeholder="Enter encrypted text here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <Button type="submit">Analyze Frequency</Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  form.reset();
                  onReset();
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EncryptionForm;
