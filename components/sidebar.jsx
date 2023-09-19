import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

// import { NavItem } from "../../types";

// import styles from "./styles.module.scss";

export default function Sidebar({ items }) {
  return (
    <div>
      <h1>Table of Contents</h1>
      <nav>
        <ul>
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

function Item({ item }) {
  //   const router = useRouter();
  //   const isActive = React.useCallback((href) => href === router.asPath, [router.asPath]);

  if ("items" in item) {
    // Category
    return (
      <div>
        <li>
          <details>
            {/* <summary>
              {item.label}
              <ChevronRightIcon />
            </summary> */}
            <ul>
              {item.items.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </ul>
          </details>
        </li>
      </div>
    );
  } else {
    // Document link
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          //   className={clsx(styles.button, isActive(item.href) && styles.isActive)}
          //   aria-current={isActive(item.href) ? "page" : undefined}
        >
          {item.label}
        </Link>
      </li>
    );
  }
}
