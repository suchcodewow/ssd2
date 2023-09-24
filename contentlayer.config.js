import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";
import { visit } from "unist-util-visit";
import rehypePrettyCode from "rehype-pretty-code";

const computedFields = {
  url: {
    type: "string",
    resolve: (doc) => `/content/${doc._raw.flattenedPath}`,
  },
  section: {
    type: "string",
    resolve: (doc) => {
      if (doc._raw.sourceFileName == "index.mdx") {
        let basePath = `_/${doc._raw.sourceFileDir}`;
        return basePath.substring(0, basePath.lastIndexOf("/"));
      } else {
        return `_/${doc._raw.sourceFileDir}`;
      }
    },
  },
  parentOf: {
    type: "string",
    resolve: (doc) => {
      if (doc._raw.sourceFileName == "index.mdx") {
        return `_/${doc._raw.sourceFileDir}`;
      }
    },
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const staticContent = defineDocumentType(() => ({
  name: "Content",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
    },
    order: {
      type: "string",
      default: "0",
    },
  },
  computedFields,
}));

const customTOC = (toc) => {
  try {
    const { children } = toc;
    const childrenOfChildren = children?.[0]?.children;
    if (!children?.length || !childrenOfChildren?.length) return null;
  } catch (e) {}
  return {
    type: "element",
    tagName: "div",
    properties: { className: "toc" },
    children: [
      {
        type: "element",
        tagName: "p",
        properties: { className: "title" },
        children: [
          {
            type: "text",
            value: "Table of Contents",
          },
        ],
      },
      ...(toc.children || []),
    ],
  };
};

export default makeSource({
  contentDirPath: "content",
  documentTypes: [staticContent],
  mdx: {
    rehypePlugins: [
      // custom plugin to get code before it's highlighted
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;

            if (codeEl.tagName !== "code") return;

            node.raw = codeEl.children?.[0].value;
          }
        });
      },
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "one-dark-pro",
            light: "github-light",
          },
        },
      ],
      //custom plugin to generate light and dark versions of code blocks
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "div") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return;
            }

            for (const child of node.children) {
              if (child.tagName === "pre") {
                child.properties["raw"] = node.raw;
              }
            }
          }
        });
      },
      rehypeSlug,
      [rehypeToc, { customTOC }],
    ],
  },
});
