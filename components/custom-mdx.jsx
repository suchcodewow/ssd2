import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { CopyButton } from "./copycode";

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

export function CustomMdx({ code }) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
