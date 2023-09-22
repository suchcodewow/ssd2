import { allContents } from "@/.contentlayer/generated";
import Link from "next/link";
// console.log(StaticContent);
const docs = allContents.sort((a, b) => a.order - b.order);

const RenderNav = ({ nodeStart }) => {
  return (
    <div className="ml-3">
      {docs
        .filter((a) => a.section == nodeStart)
        .map((navItem) => {
          return navItem.parentOf ? (
            <div key={navItem.url}>
              <Link href={navItem.url}>{navItem.title}</Link>
              <RenderNav nodeStart={navItem.parentOf} />
            </div>
          ) : (
            <div key={navItem.url}>
              <Link href={navItem.url}>{navItem.title}</Link>
            </div>
          );
        })}
    </div>
  );
};

export default function Sidebar() {
  return (
    <div className="w-screen">
      <RenderNav nodeStart="_" />
      <table className="hidden">
        <thead>
          <tr>
            <th>title</th>
            <th>order</th>
            <th>parentOf</th>
            <th>section</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={doc._id}>
              <td>{doc.title}</td>
              <td>{doc.order}</td>
              <td>{doc.parentOf}</td>
              <td>{doc.section}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
