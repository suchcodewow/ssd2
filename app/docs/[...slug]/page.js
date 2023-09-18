import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";

// import { Metadata } from "next";
import { Mdx } from "@/components/mdx";

async function getDocFromParams(params) {
  const slug = params?.slug?.join("/");
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    null;
  }

  return doc;
}

export async function generateMetadata({ params }) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    return {};
  }

  return {
    title: doc.title,
    description: doc.description,
  };
}

export async function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1 className="mb-2">{doc.title}</h1>
      {doc.description && <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">{doc.description}</p>}
      <hr className="my-4" />
      <Mdx code={doc.body.code} />
    </article>
  );
}
