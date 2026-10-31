"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function BrandSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`brand-splash${visible ? "" : " brand-splash--hidden"}`}
      aria-hidden="true"
    >
      <Image
        src="/images/seva-logo-header.png"
        alt=""
        width={443}
        height={431}
        priority
        className="brand-splash__logo"
      />
      <span className="brand-splash__loader" />
    </div>
  );
}
