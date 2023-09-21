import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";
import { Mdx } from "@/components/mdx";

export const generateStaticParams = async () => allDocs.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }) => {
  const post = allDocs.find((post) => post._raw.flattenedPath === params.slug);
  return { title: post.title };
};

const PostLayout = ({ params }) => {
  console.log("hi mom");
  const post = allDocs.find((post) => post._raw.flattenedPath === params.slug);

  const Content = Mdx(post.body.code);

  return (
    <article className="py-8 mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1>{post.title}</h1>
      </div>
      <Content />
    </article>
  );
};

export default PostLayout;
