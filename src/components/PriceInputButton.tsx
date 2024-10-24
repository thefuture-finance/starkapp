import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface PriceInputButtonProps extends Omit<InputProps, "value" | "onChange"> {
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
}

export default function PriceInputButton({
  className,
  type,
  value,
  setValue,
  ...props
}: PriceInputButtonProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (
      /^-?(\d*\.?\d{0,18}|\d+\.?\d{0,18})$/.test(inputValue) ||
      inputValue === ""
    ) {
      setValue(inputValue);
    }
  };

  const handleBlur = () => {
    if (value !== "") {
      const [integerPart, decimalPart] = value.split(".");

      let formattedInteger;
      if (decimalPart) {
        formattedInteger =
          integerPart.length > 1
            ? integerPart.replace(/^0+(?=\d)/, "")
            : integerPart;
      } else {
        formattedInteger = integerPart.replace(/^-?0+/, "") || "0";
      }

      const formattedDecimal = decimalPart ? decimalPart.slice(0, 18) : "";
      const formattedValue = `${formattedInteger}${formattedDecimal ? "." + formattedDecimal : ""}`;
      setValue(formattedValue || "0");
    }
  };

  return (
    <Input
      {...props}
      id="number-input"
      type="text"
      inputMode="decimal"
      placeholder="0.00"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      autoComplete="off"
      className={cn(
        "bg-transparent file:bg-none focus-visible:ring-0 border-none focus-visible:ring-offset-0",
        className,
      )}
    />
  );
}
