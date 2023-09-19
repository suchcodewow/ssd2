import Link from "next/link";
import { allDocs } from "@/.contentlayer/generated";

export default function Home() {
  // const docs = allDocs.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const docs = allDocs.sort((a, b) => a.slug.localeCompare(b.slug));
  return (
    // <div className="prose dark:prose-invert">
    //   {allDocs.map((doc) => (
    //     // <p>{doc}</p>
    //     <article key={doc._id}>
    //       <Link href={doc.slug}>
    //         <h2>{doc.title}</h2>
    //         <p>
    //           {doc.slugAsParams} {doc.order}
    //         </p>
    //       </Link>
    //       {doc.description && <p>{doc.description}</p>}
    //     </article>
    //   ))}
    // </div>
    <div>
      <table>
        <th>title</th>
        <th>order</th>
        <th>slug</th>
        <th>slugasParams</th>
        {docs.map((doc) => (
          <tr key={doc._id}>
            <td>{doc._id}</td>
            <td>{doc.order}</td>
            <td>{doc.slug}</td>
            <td>{doc.slugAsParams}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
