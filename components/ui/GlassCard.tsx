import { ElementType, HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  tint?: boolean;
  radius?: string;
};

/** Liquid Glass surface: frosted fill, 1px frost border, inner specular edge. */
export default function GlassCard({
  as,
  tint = false,
  radius = "rounded-card",
  className = "",
  children,
  ...rest
}: GlassCardProps) {
  const Tag = (as || "div") as ElementType;
  return (
    <Tag
      className={`glass ${tint ? "glass-tint" : ""} ${radius} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
