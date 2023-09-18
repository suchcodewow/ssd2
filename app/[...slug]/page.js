import { notFound } from "next/navigation";
// import { Metadata } from "next";
import { allPages } from "contentlayer/generated";
import { Mdx } from "@/components/mdx";
import Sidebar from "@/components/sidebar";

async function getPageFromParams(params) {
  const slug = params?.slug?.join("/");
  const page = allPages.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({ params }) {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export async function generateStaticParams() {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <div>
      <article className="py-6 prose dark:prose-invert">
        <h1>{page.title}</h1>
        {page.description && <p className="text-xl">{page.description}</p>}
        <hr />
        <div>
          <Mdx code={page.body.code} />
        </div>
      </article>
      <aside>
        <Sidebar
          items={[
            {
              id: "item1",
              href: "#",
              label: "Item 1",
            },
            {
              id: "category1",
              label: "Category 1",
              items: [
                {
                  id: "category1-1",
                  label: "Category 1-1",
                  href: "www.google.com",
                },
                {
                  id: "category1-2",
                  label: "Category 1-2",
                  href: "#",
                },
              ],
            },
          ]}
        />
      </aside>
    </div>
  );
}
