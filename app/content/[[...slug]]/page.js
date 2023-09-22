import { notFound } from "next/navigation";
import Image from "next/image";
import { CopyButton } from "@/components/copycode";
import { allContents } from "contentlayer/generated";
import { CustomMdx } from "@/components/custom-mdx";
import { useMDXComponent } from "next-contentlayer/hooks";

// console.log(allContents);
export async function generateStaticParams() {
  return allContents.map((item) => ({ slug: item._raw.flattenedPath.split("/") }));
}

export const generateMetadata = ({ params }) => {
  const urlSlug = `${params.slug.join("/")}`;
  const content = allContents.find((item) => item._raw.flattenedPath === urlSlug);
  // TODO: other possible good metadatasasasz
  return { title: "SCW: " + content.title };
};
// TODO: move to another file
const Pre = ({ children, raw, ...props }) => {
  const lang = props["data-language"] || "shell";
  return (
    <pre {...props} className={"p-0"}>
      <div className={"code-header"}>
        {lang}
        <CopyButton text={raw} />
      </div>
      {children}
    </pre>
  );
};

const components = {
  Image,
  pre: Pre,
};
// Move above to another file

const ContentLayout = ({ params }) => {
  const urlSlug = `${params.slug.join("/")}`;
  const content = allContents.find((item) => item._raw.flattenedPath === urlSlug);
  // console.log(content.body.code);
  const Content = useMDXComponent(content.body.code);
  return (
    <article className="py-8 mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <h1>{content.title}</h1>
      </div>
      <Content components={components} />
    </article>
  );
};

export default ContentLayout;
