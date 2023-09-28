import { allContents } from "@/.contentlayer/generated";
import { SideNav } from "./hui";
import { RenderNav } from "./hui";

const docs = allContents.sort((a, b) => a.order - b.order);

export default function Sidebar() {
  return (
    <div className="w-screen">
      <RenderNav nodeStart="_/docs/workshops-0/details-4" />
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
