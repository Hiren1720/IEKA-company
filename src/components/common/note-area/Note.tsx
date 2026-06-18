import React from "react";

type NoteVariant = "info" | "success" | "warning" | "danger";

interface NoteProps {
  message: string;
  variant?: NoteVariant;
  className?: string;
}

const Note = ({
  message,
  variant = "info",
  className = "",
}: NoteProps) => {
  const variantClasses = {
    info: `
      bg-[var(--status-pending-light)]
      border-l-[var(--status-pending)]
    `,
    success: `
      bg-[var(--status-active-light)]
      border-l-[var(--status-active)]
    `,
    warning: `
      bg-[var(--status-inactive-light)]
      border-l-[var(--status-inactive)]
    `,
    danger: `
      bg-[var(--status-deleted-light)]
      border-l-[var(--status-deleted)]
    `,
  }[variant];

  return (
    <div
      className={`
        p-[10px]
        border-l-[3px]
        ${variantClasses}
        ${className}
      `}
    >
      <div className="text-[12px] text-[#5e5e5e] leading-[1.5]">
        {message}
      </div>
    </div>
  );
};

export default Note;