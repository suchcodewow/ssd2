import { allContents } from "@/.contentlayer/generated";
import { RenderNav } from "../context/sidenav";

// keep until confident we don't need to render contextlayer to a visible table
const docs = allContents.sort((a, b) => a.order - b.order);

export default function Sidebar({ nodeStart }) {
  return (
    <div className="w-screen">
      <RenderNav nodeStart={nodeStart ? nodeStart : "_/"} />
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
