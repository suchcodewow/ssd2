import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";
import { visit } from "unist-util-visit";
import rehypePrettyCode from "rehype-pretty-code";
import { remarkCustom } from "./components/remark";
import { toString } from "./components/remark";

const computedFields = {
  url: {
    type: "string",
    resolve: (doc) => `/content/${doc._raw.flattenedPath}`,
  },
  section: {
    type: "string",
    resolve: (doc) => {
      if (doc._raw.sourceFileName == "index.mdx") {
        let basePath = `/content/${doc._raw.sourceFileDir}`;
        return basePath.substring(0, basePath.lastIndexOf("/"));
      } else {
        return `/content/${doc._raw.sourceFileDir}`;
      }
    },
  },
  parentOf: {
    type: "string",
    resolve: (doc) => {
      if (doc._raw.sourceFileName == "index.mdx") {
        return `/content/${doc._raw.sourceFileDir}`;
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
      type: "number",
      default: 0,
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
    remarkPlugins: [
      // () => (tree) => {
      //   visit(tree, "heading", (node) => {
      //     // if (node.depth !== 1) return;
      //     let text = toString(node) + "HI MOM";
      //     node.children[0].value = text;
      //     console.log(node);
      //   });
      // },
      // () => (tree) => {
      //   visit(tree, "paragraph", (node) => {
      //     if (node.children[0].value?.startsWith(":::")) {
      //       // if (node.type == "html") {
      //       const content = node.children[0].value.split("\n");
      //       const calloutType = content[0].substring(3);
      //       if (calloutType.startsWith("tip")) {
      //         const userSummary = calloutType.substring(3).trim();
      //         const summary = userSummary.length > 0 ? userSummary : "TIP";
      //         const finalString = `<details><summary>${summary}</summary>${content.slice(1).join("\n")}</details>`;
      //         const finalString = `<div>`;
      //         console.log(node);
      //         node.type = "html";
      //         node.children = undefined;
      //         node.value = finalString;
      //         console.log(node);
      //       }
      //     }
      //   });
      // },
      () => (tree) => {
        visit(tree, (node) => {
          if (node.type == "html") {
            // console.log(node);
          }
        });
      },
    ],
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          console.log(node);
        });
      },
      // custom plugin to get code before it's highlighted for the copy/paste button
      () => (tree) => {
        visit(tree, "paragraph", (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            // console.log(node);
            const [codeEl] = node.children;
            if (codeEl.tagName !== "code") return;
            node.raw = codeEl.children?.[0].value;
          }
        });
      },
      [
        // plugin to generate code blocks based on Shiki highlighter
        rehypePrettyCode,
        {
          theme: {
            dark: "one-dark-pro",
            light: "github-light",
          },
        },
      ],
      //custom plugin to generate light and dark versions of code blocks - using CSS to hide unused one
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
