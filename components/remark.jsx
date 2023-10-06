// const heading = require("mdast-util-heading-range");
// const toString = require("mdast-util-to-string");

//MDAST UTIL TO STRING
/**
 * @typedef {import('mdast').Nodes} Nodes
 *
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean | null | undefined} [includeImageAlt=true]
 *   Whether to use `alt` for `image`s (default: `true`).
 * @property {boolean | null | undefined} [includeHtml=true]
 *   Whether to use `value` of HTML (default: `true`).
 */

/** @type {Options} */
const emptyOptions = {};

/**
 * Get the text content of a node or list of nodes.
 *
 * Prefers the node’s plain-text fields, otherwise serializes its children,
 * and if the given value is an array, serialize the nodes in it.
 *
 * @param {unknown} [value]
 *   Thing to serialize, typically `Node`.
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {string}
 *   Serialized `value`.
 */
export function toString(value, options) {
  const settings = options || emptyOptions;
  const includeImageAlt = typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true;
  const includeHtml = typeof settings.includeHtml === "boolean" ? settings.includeHtml : true;

  return one(value, includeImageAlt, includeHtml);
}

/**
 * One node or several nodes.
 *
 * @param {unknown} value
 *   Thing to serialize.
 * @param {boolean} includeImageAlt
 *   Include image `alt`s.
 * @param {boolean} includeHtml
 *   Include HTML.
 * @returns {string}
 *   Serialized node.
 */
function one(value, includeImageAlt, includeHtml) {
  if (node(value)) {
    if ("value" in value) {
      return value.type === "html" && !includeHtml ? "" : value.value;
    }

    if (includeImageAlt && "alt" in value && value.alt) {
      return value.alt;
    }

    if ("children" in value) {
      return all(value.children, includeImageAlt, includeHtml);
    }
  }

  if (Array.isArray(value)) {
    return all(value, includeImageAlt, includeHtml);
  }

  return "";
}

/**
 * Serialize a list of nodes.
 *
 * @param {Array<unknown>} values
 *   Thing to serialize.
 * @param {boolean} includeImageAlt
 *   Include image `alt`s.
 * @param {boolean} includeHtml
 *   Include HTML.
 * @returns {string}
 *   Serialized nodes.
 */
function all(values, includeImageAlt, includeHtml) {
  /** @type {Array<string>} */
  const result = [];
  let index = -1;

  while (++index < values.length) {
    result[index] = one(values[index], includeImageAlt, includeHtml);
  }

  return result.join("");
}

/**
 * Check if `value` looks like a node.
 *
 * @param {unknown} value
 *   Thing.
 * @returns {value is Nodes}
 *   Whether `value` is a node.
 */

//MDAST UTIL TO HEADING RANGE
/**
 * @typedef {import('mdast').Heading} Heading
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').RootContent} RootContent
 * @typedef {import('unist').Node} UnistNode
 * @typedef {import('unist').Parent} UnistParent
 */

/**
 * @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10} Uint
 *   Number; capped reasonably.
 */

/**
 * @typedef {I extends 0 ? 1 : I extends 1 ? 2 : I extends 2 ? 3 : I extends 3 ? 4 : I extends 4 ? 5 : I extends 5 ? 6 : I extends 6 ? 7 : I extends 7 ? 8 : I extends 8 ? 9 : 10} Increment
 *   Increment a number in the type system.
 * @template {Uint} [I=0]
 *   Index.
 */

/**
 * @typedef {(
 *   Tree extends UnistParent
 *     ? Depth extends Max
 *       ? Tree
 *       : Tree | InclusiveDescendant<Tree['children'][number], Max, Increment<Depth>>
 *     : Tree
 * )} InclusiveDescendant
 *   Collect all (inclusive) descendants of `Tree`.
 *
 *   > 👉 **Note**: for performance reasons, this seems to be the fastest way to
 *   > recurse without actually running into an infinite loop, which the
 *   > previous version did.
 *   >
 *   > Practically, a max of `2` is typically enough assuming a `Root` is
 *   > passed, but it doesn’t improve performance.
 *   > It gets higher with `List > ListItem > Table > TableRow > TableCell`.
 *   > Using up to `10` doesn’t hurt or help either.
 * @template {UnistNode} Tree
 *   Tree type.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */

/**
 * @typedef {(
 *   Node extends {children: Array<infer Child>}
 *   ? Child
 *   : never
 * )} InternalChild
 *   Collect nodes that can be parents of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Parent
 *   Node to search for.
 */

/**
 * @typedef {(
 *   Node extends UnistParent
 *   ? Node extends {children: Array<infer Children>}
 *     ? Kind extends Children ? Node : never
 *     : never
 *   : never
 * )} InternalParent
 *   Collect nodes that can be parents of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Kind
 *   Node to search for.
 */

/**
 * @typedef {InternalChild<InclusiveDescendant<Tree>, Kind>} Child
 *   Collect nodes in `Tree` that can be parents of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Kind
 *   Node to search for.
 */

/**
 * @typedef {InternalParent<InclusiveDescendant<Tree>, Kind>} Parent
 *   Collect nodes in `Tree` that can be parents of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Kind
 *   Node to search for.
 */

/**
 * @callback Handler
 *   Callback called when a section is found.
 * @param {Heading} start
 *   Start of section (a heading node matching `test`).
 * @param {Array<RootContent>} between
 *   Nodes between `start` and `end`.
 * @param {RootContent | undefined} end
 *   End of section, if any.
 * @param {Info} scope
 *   Extra info.
 * @returns {Array<RootContent | null | undefined> | null | undefined | void}
 *   Results.
 *
 *   If nothing is returned, nothing will be changed.
 *   If an array of nodes (can include `null` and `undefined`) is returned, the
 *   original section will be replaced by those nodes.
 *
 * @typedef Info
 *   Extra info.
 * @property {Parent<Root, Heading>} parent
 *   Parent of the section.
 * @property {number} start
 *   Index of `start` in `parent`.
 * @property {number | undefined} end
 *   Index of `end` in `parent`.
 *
 * @typedef Options
 *   Configuration.
 * @property {Test} test
 *   Test for a heading.
 * @property {boolean | null | undefined} [ignoreFinalDefinitions=false]
 *   Ignore final definitions otherwise in the section (default: `false`).
 *
 * @typedef {RegExp | TestFunction | string} Test
 *   Test for a heading.
 *
 *   When `string`, wrapped in `new RegExp('^(' + value + ')$', 'i')`;
 *   when `RegExp`, wrapped in `(value) => expression.test(value)`
 *
 * @callback TestFunction
 *   Check if a node matches.
 * @param {string} value
 *   Plain-text heading.
 * @param {Heading} node
 *   Heading node.
 * @returns {boolean | null | undefined | void}
 *   Whether this is the heading that is searched for.
 */

import { ok as assert } from "devlop";
// import { toString } from "mdast-util-to-string";

/**
 * Search `tree` for a heading matching `test` and change its “section” with
 * `handler`.
 *
 * A “section” ranges from the matched heading until the next heading of the
 * same or lower depth, or the end of the document.
 *
 * If `ignoreFinalDefinitions: true`, final definitions “in” the section are
 * excluded.
 *
 * @param {Parent<Root, Heading>} tree
 *   Tree to change.
 * @param {Options | Test} options
 *   Configuration.
 * @param {Handler} handler
 *   Handle a section.
 * @returns {undefined}
 *   Nothing.
 */
// eslint-disable-next-line complexity
export function headingRange(tree, options, handler) {
  let test = options;
  const children = "children" in tree ? tree.children : [];
  let ignoreFinalDefinitions = false;

  // Object, not regex.
  if (test && typeof test === "object" && !("exec" in test)) {
    ignoreFinalDefinitions = test.ignoreFinalDefinitions === true;
    test = test.test;
  }

  // Transform a string into an applicable expression.
  if (typeof test === "string") {
    test = new RegExp("^(" + test + ")$", "i");
  }

  // Regex.
  if (test && "exec" in test) {
    test = wrapExpression(test);
  }

  if (typeof test !== "function") {
    throw new TypeError("Expected `string`, `regexp`, or `function` for `test`, not `" + test + "`");
  }

  let index = -1;
  /** @type {number | undefined} */
  let start;
  /** @type {number | undefined} */
  let end;
  /** @type {number|  undefined} */
  let depth;

  // Find the range.
  while (++index < children.length) {
    const child = children[index];

    if (child.type === "heading") {
      if (depth && child.depth <= depth) {
        end = index;
        break;
      }

      if (!depth && test(toString(child), child)) {
        depth = child.depth;
        start = index;
        // Assume no end heading is found.
        end = children.length;
      }
    }
  }

  // When we have a starting heading.
  if (depth && end !== undefined && start !== undefined) {
    if (ignoreFinalDefinitions) {
      while (children[end - 1].type === "definition" || children[end - 1].type === "footnoteDefinition") {
        end--;
      }
    }

    const head = children[start];
    assert(head.type === "heading");

    const parent = tree;
    assert("children" in parent, "parent is a parent");

    const from = children.slice(start + 1, end);

    const nodes = handler(head, from, children[end], {
      parent,
      start,
      end: children[end] ? end : undefined,
    });

    if (nodes) {
      // Ensure no empty nodes are inserted.
      // This could be the case if `end` is in `nodes` but no `end` node exists.
      /** @type {Array<RootContent>} */
      const result = [];
      let index = -1;

      while (++index < nodes.length) {
        const node = nodes[index];
        if (node) result.push(node);
      }

      children.splice(start, end - start + 1, ...result);
    }
  }
}

/**
 * Wrap an expression into an assertion function.
 *
 * @param {RegExp} expression
 *   Test expression.
 * @returns {TestFunction}
 *   Test function.
 */
function wrapExpression(expression) {
  return assertion;

  /** @type {TestFunction} */
  function assertion(value) {
    return expression.test(value);
  }
}

function node(value) {
  return Boolean(value && typeof value === "object");
}

function defaultSummarizer(str) {
  return "Open " + str;
}

function isString(str) {
  return typeof str === "string";
}

function isFunction(fn) {
  return typeof fn === "function";
}

export async function remarkCustom(opts) {
  //   if (opts == null || opts.test == null) throw new Error("options.test must be given");

  const summarizer =
    opts.summary == null ? defaultSummarizer : isString(opts.summary) ? () => opts.summary : opts.summary;

  if (!isFunction(summarizer)) throw new Error("options.summary must be function");

  return function (node) {
    heading(node, opts.test, function (start, nodes, end) {
      return [
        // start,
        // {
        //   type: "paragraph",
        //   children: [
        //     {
        //       type: "html",
        //       value: "<details>",
        //     },
        //     {
        //       type: "html",
        //       value: "<summary>",
        //     },
        //     {
        //       type: "text",
        //       value: summarizer(toString(start)),
        //     },
        //     {
        //       type: "html",
        //       value: "</summary>",
        //     },
        //   ],
        // },
        // ...nodes,
        // {
        //   type: "paragraph",
        //   children: [
        //     {
        //       type: "html",
        //       value: "</details>",
        //     },
        //   ],
        // },
        // end,
      ];
    });
  };
}

/**
 * @typedef {import('hast').Root} Root
 */

/**
 * @typedef Options
 *   Configuration (optional).
 * @property {string} [prefix='']
 *   Prefix to add in front of `id`s (default: `''`).
 */

// import GithubSlugger from "github-slugger";
// import { headingRank } from "hast-util-heading-rank";
// import { toString } from "hast-util-to-string";
// import { visit } from "unist-util-visit";

// /** @type {Options} */
// const emptyOptions = {};
// const slugs = new GithubSlugger();

// /**
//  * Add `id`s to headings.
//  *
//  * @param {Options | null | undefined} [options]
//  *   Configuration (optional).
//  * @returns
//  *   Transform.
//  */
// export default function rehypeSlug(options) {
//   const settings = options || emptyOptions;
//   const prefix = settings.prefix || "";

//   /**
//    * @param {Root} tree
//    *   Tree.
//    * @returns {undefined}
//    *   Nothing.
//    */
//   return function (tree) {
//     slugs.reset();

//     visit(tree, "element", function (node) {
//       if (headingRank(node) && !node.properties.id) {
//         node.properties.id = prefix + slugs.slug(toString(node));
//       }
//     });
//   };
// }
