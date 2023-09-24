import { allContents } from "contentlayer/generated";
import { CustomMdx } from "@/components/custom-mdx";
// import Sidebar from "@/components/sidebar";

// console.log(allContents);
export function generateStaticParams() {
  return allContents.map((item) => ({ slug: item._raw.flattenedPath.split("/") }));
}

export const generateMetadata = ({ params }) => {
  const urlSlug = params.slug ? `${params.slug.join("/")}` : "";
  const content = allContents.find((item) => item._raw.flattenedPath === urlSlug);
  // TODO: other possible good metadatasasasz
  return { title: "SCW: " + content.title };
};

const ContentLayout = ({ params }) => {
  // console.log(params.slug);
  const urlSlug = params.slug ? `${params.slug.join("/")}` : "";
  const content = allContents.find((item) => item._raw.flattenedPath === urlSlug);
  return (
    <div>
      <article className="py-8 mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <h1>{content.title}</h1>
        </div>
        <CustomMdx code={content.body.code} />
      </article>
    </div>
  );
};

export default ContentLayout;
