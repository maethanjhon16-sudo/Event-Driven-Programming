import React from "react";
import { Card, Button, Typography, Space } from "antd";

const { Text, Title } = Typography;

export type DiscountType = "percent" | "fixed";

type Props = {
  subtotal: number;
  discountType: DiscountType;
  discountValue: number;
  grandTotal: number;
  onOpenCart: () => void;
};

const SummaryCard: React.FC<Props> = ({
  subtotal,
  discountType,
  discountValue,
  grandTotal,
  onOpenCart,
}) => (
  <Card style={{ width: 360 }}>
    <Space direction="vertical" size={8} style={{ width: "100%" }}>
      <Title level={4}>Cart Summary</Title>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text>Subtotal</Text>
        <Text>${subtotal.toFixed(2)}</Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text>Discount</Text>
        <Text>
          {discountValue === 0
            ? "-$0.00"
            : `${discountValue > 0 ? "-" : "+"}${
                discountType === "percent"
                  ? `${Math.abs(discountValue)}%`
                  : `$${Math.abs(discountValue).toFixed(2)}`
              }`}
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 600,
        }}
      >
        <Text>Grand Total</Text>
        <Text>${grandTotal.toFixed(2)}</Text>
      </div>
      <Button type="primary" onClick={onOpenCart} block>
        View / Edit Cart
      </Button>
    </Space>
  </Card>
);

export default SummaryCard;
