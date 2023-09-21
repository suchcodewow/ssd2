import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { allDocs } from "@/.contentlayer/generated";

const docs = allDocs.sort((a, b) => a.sectionLevel - b.sectionLevel || a.order - b.order);
const maxDepth = Math.max(...docs.map((o) => o.sectionLevel));
const navNodes = (docs) => {
  const res = {};
  let ref = res;
};
// async function sortNodes() {
//   for (let doc of docs) {
//     // convert document list into json array for rendering
//   sections = doc.section.split("/")
//   for
//   }
// }
let sortedDocs = [];
let navData = [];

console.log("start");
async function sortLevel(sectionLevel, section) {
  // console.log(" sectionLevel:", sectionLevel, " section: ", section);
  const currentDocs = docs.filter((a) => a.sectionLevel == sectionLevel);
  console.log("found ", currentDocs.length, " level ", sectionLevel, " section ", section);
  for (const currentDoc of currentDocs) {
    // console.log(currentDoc.slug);
    // if (currentDoc.section == section && !currentDoc.sectionHead) {
    // console.log("+slug: ", currentDoc.slugAsParams, ":", currentDoc.section, "=", section);
    if (currentDoc.section.substring(0, section.length) == section) {
      let safeSectionHead = currentDoc.sectionHead;
      if (currentDoc.sectionLevel == 0) {
        // set root doc as not a section head to avoid infinite loopage
        safeSectionHead = false;
      }
      sortedDocs.push(currentDoc);
      navData.push({
        title: currentDoc.title,
        section: currentDoc.section,
        sectionLevel: currentDoc.sectionLevel,
        sectionHead: safeSectionHead,
      });
      if (currentDoc.sectionHead) {
        await sortLevel(sectionLevel + 1, currentDoc.section);
      }
    }
  }
}
sortLevel(0, "/");

const RenderNav = ({ nodeStart }) => {
  return (
    <div className="ml-3">
      {navData
        .filter((a) => a.section == nodeStart)
        .map((navItem) => {
          console.log("USING: ", nodeStart);
          console.log(navItem);
          return navItem.sectionHead ? (
            <div>
              <p key={navItem.slug}>{navItem.title}</p>
              <RenderNav nodeStart={navItem.section} />
            </div>
          ) : (
            <div>
              <p key={navItem.slug}>{navItem.title}</p>
            </div>
          );
        })}
    </div>
  );
};

// function NavSwitch({ navItem }) {
//   switch (navItem.type) {
//     case "newSection":
//       return <div className="ml-{navItem.sectionLevel}">{navItem.title}</div>;
//     case "newItem":
//       return <div className="ml-${navItem.sectionLevel}">{navItem.title}</div>;
//     case "endSection":
//       return null;
//     default:
//       return <p>hi mom</p>;
//   }
// }
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
      <RenderNav nodeStart="/" />
      {/* {navData.map((navItem) => (
        <NavSwitch navItem={navItem} />
      ))} */}
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
              <td>{doc.title}</td>
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
      {/* <table>
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
          {allDocs.map((doc) => (
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
      </table> */}
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
