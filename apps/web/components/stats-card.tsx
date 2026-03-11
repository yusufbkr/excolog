import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Skeleton } from "@repo/ui/components/skeleton";
import cn from "@repo/ui/utils/cn";

interface StatsCardProps {
  title: string;
  value?: string | number;
  description: string;
  className?: string;
  isLoading?: boolean;
}

function StatsCard({
  title,
  value,
  description,
  className,
  isLoading,
}: StatsCardProps) {
  return (
    <Card className={cn("min-w-50 gap-0 p-3", className)}>
      <CardHeader className="px-0">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="text-2xl font-bold">
          {isLoading ? <Skeleton className="h-8 w-20" /> : value}
        </div>
        <span className="text-muted-foreground mt-1 text-xs">
          {isLoading ? <Skeleton className="mt-1 h-5 w-28" /> : description}
        </span>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
