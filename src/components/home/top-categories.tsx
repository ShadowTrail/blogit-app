import { Posts as Categories} from "@/lib/constants"
import { Button } from "../ui/button"
import Link from "next/link"


export default function TopCategories() {
    return(
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
            {Categories.map((category) => (
                <Button key={category.title} variant={"secondary"} className="hover:scale-110 transition-all]" asChild>
                    <Link href={`${category.href}`}>{category.title}</Link>
                </Button>
            ))}
        </div>
    )
}