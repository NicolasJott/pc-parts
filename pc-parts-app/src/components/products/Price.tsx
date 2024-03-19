import { Text, useStyleConfig } from "@chakra-ui/react";
import React from "react";

type PriceProps = {
  amount: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<typeof Text>;

export const Price = ({
  amount,
  currencyCode = "USD",
  currencyCodeClassName,
  ...textProps
}: PriceProps) => {
  const currencyStyles = useStyleConfig("Text", {
    variant: currencyCodeClassName,
  });

  return (
    <Text as="p" suppressHydrationWarning={true} {...textProps}>
      {new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
      }).format(parseFloat(amount))}
      <Text as="span" ml={1} sx={currencyStyles}>
        {currencyCode}
      </Text>
    </Text>
  );
};
