import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { allDocs } from "@/.contentlayer/generated";

let sortedDocs = [];
let navData = [];
const docs = allDocs.sort((a, b) => a.sectionLevel - b.sectionLevel || a.order - b.order);
// console.log("start");
async function sortLevel(sectionLevel, section) {
  // console.log(" sectionLevel:", sectionLevel, " section: ", section);
  const currentDocs = docs.filter((a) => a.sectionLevel == sectionLevel);
  for (const currentDoc of currentDocs) {
    // console.log(currentDoc.slug);
    if (currentDoc.section == section && !currentDoc.sectionHead) {
      // console.log("+slug: ", currentDoc.slugAsParams, ":", currentDoc.section, "=", section);
      sortedDocs.push(currentDoc);
      navData.push({ type: "newItem", title: currentDoc.title, sectionLevel: currentDoc.sectionLevel });
    }
    // console.log("debug: section.length:", currentDoc.section.substring(0, section.length));
    if (currentDoc.sectionHead && currentDoc.section.substring(0, section.length) == section) {
      // console.log("+slug: ", currentDoc.slugAsParams, ":", currentDoc.section);
      sortedDocs.push(currentDoc);
      navData.push({ type: "newSection", title: currentDoc.title, sectionLevel: currentDoc.sectionLevel });
      await sortLevel(sectionLevel + 1, currentDoc.section);
    }
    navData.push({ type: "endSection" });
  }
  // console.log("<- back to whatchoo doin");
}
sortLevel(0, "/");

function NavSwitch({ navItem }) {
  switch (navItem.type) {
    case "newSection":
      return <div className="ml-{navItem.sectionLevel}">{navItem.title}</div>;
    case "newItem":
      return <div className="ml-${navItem.sectionLevel}">{navItem.title}</div>;
    case "endSection":
      return null;
    default:
      return <p>hi mom</p>;
  }
}
// function testComponent({ item }) {
//   return item;
// }
// const testData = [];
// testData.push("<ul><li>wtf</li>");
// testData.push("<li>this</li>");
// testData.push("<li>sucks</li>");
// testData.push("</ul>");

// function NavSwitch({ navItem }) {
//   if (navItem.type == "newSection") {
//     return <ul><li>{navItem.title}</li>;
//   } elseif {
//     return <h2>{navItem.title}</h2>;
//   }
// }

export default function Sidebar() {
  return (
    <div className="w-screen">
      {navData.map((navItem) => (
        <NavSwitch navItem={navItem} />
      ))}
      {/* <div>
        {testData.map((item) => (
          <testComponent item={item} />
        ))}
      </div> */}
      {/* {navData.map((navItem) => (
        <NavSwitch navItem={navItem} />
      ))} */}

      {/* // ((nav)=> {
//   switch(nav.type) {
//     case 'newSection':
//       return <ul><li>{nav.title}</li>
//   } */}
      <table>
        <thead>
          <tr>
            <th>doc</th>
            <th>order</th>
            <th>slug</th>
            <th>slugasParams</th>
            <th>section</th>
            <th>SectionHead?</th>
            <th>SectionLevel</th>
          </tr>
        </thead>
        <tbody>
          {sortedDocs.map((doc) => (
            <tr key={doc._id}>
              <td>{doc._raw.flattenedPath}</td>
              <td>{doc.order}</td>
              <td>{doc.slug}</td>
              <td>{doc.slugAsParams}</td>
              <td>{doc.section}</td>
              <td>{doc.sectionHead ? "true" : "false"}</td>
              <td>{doc.sectionLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// function Item({ item }) {
//   //   const router = useRouter();
//   //   const isActive = React.useCallback((href) => href === router.asPath, [router.asPath]);

//   if ("items" in item) {
//     // Category
//     return (
//       <div>
//         <li>
//           <details>
//             {/* <summary>
//               {item.label}
//               <ChevronRightIcon />
//             </summary> */}
//             <ul>
//               {item.items.map((item) => (
//                 <Item key={item.id} item={item} />
//               ))}
//             </ul>
//           </details>
//         </li>
//       </div>
//     );
//   } else {
//     // Document link
//     return (
//       <li key={item.href}>
//         <Link
//           href={item.href}
//           //   className={clsx(styles.button, isActive(item.href) && styles.isActive)}
//           //   aria-current={isActive(item.href) ? "page" : undefined}
//         >
//           {item.label}
//         </Link>
//       </li>
//     );
//   }
// }
