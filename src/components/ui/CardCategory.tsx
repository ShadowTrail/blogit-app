// frontend/src/components/ui/CardCategory.tsx

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";

interface CardCategoryProps {
  title: string;
  summary: string;
  date: string;
  imageUrl?: string;
}
export default function CardCategory({title, summary, date, imageUrl} : CardCategoryProps) {
    return (
      <Card className="w-[350px] h-[340px] shadow-lg">
        <CardHeader>
          <CardTitle className="truncate">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={350}
              height={200}
              className="object-cover rounded"
              priority
            />
          ) : (
            <Image
              src="/default-image.png" // Ensure this default image exists in public/
              alt="Default Image"
              width={350}
              height={200}
              className="object-cover rounded"
            />
          )}
          <p>{summary}</p>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-gray-500">{date}</p>
        </CardFooter>
      </Card>
    );
}