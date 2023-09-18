import Link from "next/link";
import { allDocs } from "@/.contentlayer/generated";

export default function Home() {
  // const docs = allDocs.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="prose dark:prose-invert">
      {allDocs.map((doc) => (
        // <p>{doc}</p>
        <article key={doc._id}>
          <Link href={doc.slug}>
            <h2>{doc.title}</h2>
          </Link>
          {doc.description && <p>{doc.description}</p>}
        </article>
      ))}
    </div>
  );
}
