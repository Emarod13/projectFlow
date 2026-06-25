import { Card, CardContent } from "@/components/ui/card";

type Props = {
  title: string;
  value: number;
};

export function StatCard({
  title,
  value,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <h2 className="text-4xl font-bold mt-3">
          {value}
        </h2>
      </CardContent>
    </Card>
  );
}