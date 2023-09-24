import Link from "next/link";
import { allDocs } from "@/.contentlayer/generated";
import Sidebar from "@/components/sidebar";

// export async function getStaticProps() {
//   let sortedDocs = [];
//   const docs = allDocs.sort((a, b) => a.sectionLevel - b.sectionLevel || a.order - b.order);
//   console.log("start");
//   async function sortLevel(sectionLevel, section) {
//     console.log(" sectionLevel:", sectionLevel, " section: ", section);
//     const currentDocs = docs.filter((a) => a.sectionLevel == sectionLevel);
//     for (const currentDoc of currentDocs) {
//       // console.log(currentDoc.slug);
//       if (currentDoc.section == section) {
//         console.log("+slug: ", currentDoc.slugAsParams, ":", currentDoc.section);
//         sortedDocs.push(currentDoc);
//       }
//       if (currentDoc.sectionHead) {
//         console.log("+slug: ", currentDoc.slugAsParams, ":", currentDoc.section);
//         sortedDocs.push(currentDoc);
//         await sortLevel(sectionLevel + 1, currentDoc.section);
//       }
//     }
//     console.log("<- back to whatchoo doin");
//   }
//   return { props: { sortedDocs } };
// }

export default function Home() {
  // const docs = allDocs.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  // const docs = allDocs.sort((a, b) => a.slug.localeCompare(b.slug));
  // const maxSectionLevel = Math.max(...allDocs.map((a) => a.sectionLevel));
  // for (let i = 0; i == maxSectionLevel; i++) {}
  // const sectionHeaders = allDocs
  //   .filter((a) => a.sectionHead)
  //   .map((a) => ({
  //     section: a.section,
  //     order: a.order,
  //   }));
  // const sections = [...new Set(allDocs.map((item) => item.section))];
  // console.log(maxSectionLevel);

  // const docs = allDocs.sort((a, b) => a.sectionLevel - b.sectionLevel || a.order - b.order);
  // sortedDocs = [];

  return (
    <div className="prose dark:prose-invert w-screen">
      {/* <Sidebar /> */}
      {/* <p>EOL</p> */}
      {/* <ul className="ml-2">
        <li>item1</li>
        <li>
          item2
          <ul className="ml-2">
            <li>subitem1</li>
            <li>subitem2</li>
          </ul>
        </li>
      </ul> */}
    </div>
  );
}
