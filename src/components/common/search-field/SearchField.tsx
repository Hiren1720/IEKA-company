import React, { useRef, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
  onSearch: (value: string) => void;
}

const SearchField: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = "",
  required,
  onSearch,
  ...props
}) => {
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium leading-4 text-inputLabel">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}

      <div className="group relative">
        <input
          {...props}
          onChange={(e) => handleSearchChange(e.target.value)}
          value={search}
          className={`
            w-full
            border border-inputBorder
            bg-white
            px-[15px]
            py-[5px]
            text-sm
            font-medium
            leading-[25px]
            text-[#383838]
            outline-none
            placeholder:transition-all
            placeholder:duration-400
            placeholder:ease-in-out
            focus:border-inputFocus
            placeholder:text-sm
            placeholder:font-normal
            focus:placeholder:pl-[10px]
            disabled:bg-disabledBg
            disabled:text-disabledText
            disabled:placeholder:text-disabledText
            disabled:cursor-not-allowed
            ${error ? "border-error" : ""}
            ${icon ? "pr-10" : ""}
            ${className}
          `}
        />

        {icon && (
          <span
            className="
              absolute right-[10px] top-1/2
              -translate-y-1/2
              cursor-pointer
              text-[18px]
              text-[#666]
              transition-colors
              duration-200
              group-focus-within:text-inputFocus
            "
          >
            {icon}
          </span>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};

export default SearchField;
