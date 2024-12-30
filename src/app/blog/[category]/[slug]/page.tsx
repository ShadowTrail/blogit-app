import { notFound } from "next/navigation"
import { formatDate, getBlogPosts } from "../../utils"
import Container from "@/components/ui/Container"
import Header from "@/components/ui/Header"
import { BreadcrumbWithCustomSeparator } from "@/components/ui/CustomBreadcrumb"

export default function({params}: {params: {category: string, slug: string}}) {
    let post = getBlogPosts().find((post) => post.slug === params.slug)

    if(!post){
        notFound()
    }

    return(
        <Header>
            <Container>
                <BreadcrumbWithCustomSeparator category={post.metadata.category} slug={post.slug}/>
                <h1 className="title font-semibold text-2xl tracking-tighter mt-4">{post.metadata.title}</h1>
                <div className="flex justify-between items-center mt-2 mb4 text-sm">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{formatDate(post.metadata.publishedAt)}</p>
                </div>
            </Container>
        </Header>
    )
}