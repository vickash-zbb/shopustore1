import { Construction } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Construction className="h-6 w-6 text-warning" />
            <CardTitle>Page Under Development</CardTitle>
          </div>
          <CardDescription>
            This page is currently being developed. Continue prompting to add specific functionality to this section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The {title.toLowerCase()} interface will include comprehensive management tools and features 
            tailored for e-pharmacy operations. You can request specific features or improvements 
            to continue building this section.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
