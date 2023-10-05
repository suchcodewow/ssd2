import { allContents } from "contentlayer/generated";
import { CustomMdx } from "@/components/custom-mdx";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";

export function generateStaticParams() {
  return allContents.map((item) => ({ slug: item._raw.flattenedPath.split("/") }));
}

export const generateMetadata = ({ params }) => {
  const urlSlug = params.slug ? `${params.slug.join("/")}` : "";
  const content = allContents.find((item) => item._raw.flattenedPath === urlSlug);

  return { title: "SCW: " + content.title };
};

const ContentLayout = ({ params }) => {
  const urlSlug = params.slug ? `${params.slug.join("/")}` : "";
  const content = allContents.find((item) => item._raw.flattenedPath === urlSlug);
  return (
    <>
      {/* main div stacks content vertically (flex-col) */}
      <div className="flex flex-col min-h-screen ">
        <Header />
        {/* designate main content to fill screen vertically (flex-1) */}
        <div className="flex flex-1">
          {/* adding padding to Sidebar */}
          <div className="px-4 py-6">
            <Sidebar />
          </div>
          {/* div to use all horizontal space */}
          <div className="bg-gray-200 dark:bg-gray-700 w-full flex flex-row justify-center">
            {/* give article limited max size and padding */}
            <article className="prose dark:prose-invert my-2 mx-2 rounded-lg py-16 px-16  max-w-5xl bg-white dark:bg-slate-900">
              <div className="mb-8 text-center">
                <h1>{content.title}</h1>
              </div>
              <CustomMdx code={content.body.code} />
            </article>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ContentLayout;
