import React from "react";
import {
  Drawer as AntDrawer,
  List,
  InputNumber,
  Button,
  Divider,
  Typography,
  Space,
} from "antd";

const { Text, Title } = Typography;

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = { product: Product; qty: number };

export type DiscountType = "percent" | "fixed";

type Props = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQty: (productId: number, qty: number) => void;
  removeItem: (productId: number) => void;
  discountType: DiscountType;
  discountValue: number;
  onCheckout: () => void;
};

const Drawer: React.FC<Props> = ({
  open,
  onClose,
  cart,
  updateQty,
  removeItem,
  discountType,
  discountValue,
  onCheckout,
}) => {
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const discountAmount =
    discountType === "percent"
      ? subtotal * (discountValue / 100)
      : discountValue;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  return (
    <AntDrawer
      title="Your Cart"
      placement="right"
      onClose={onClose}
      open={open}
      width={420}
    >
      <List
        dataSource={cart}
        renderItem={(item) => (
          <List.Item
            actions={[
              <InputNumber
                key="qty"
                min={1}
                value={item.qty}
                onChange={(v) => updateQty(item.product.id, v ?? 1)}
              />,
              <Button
                danger
                key="rm"
                onClick={() => removeItem(item.product.id)}
              >
                Remove
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.product.name}
              description={`$${item.product.price.toFixed(2)}`}
            />
            <div style={{ minWidth: 80, textAlign: "right" }}>
              ${(item.product.price * item.qty).toFixed(2)}
            </div>
          </List.Item>
        )}
      />

      <Divider />

      <Space direction="vertical" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text>Subtotal</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Auto discount</Text>
          <Text>2% for every $150 spent</Text>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Current discount</Text>
          <Text>{discountValue === 0 ? "0%" : `${discountValue}%`}</Text>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 600,
          }}
        >
          <Title level={5}>Grand Total</Title>
          <Title level={5}>${grandTotal.toFixed(2)}</Title>
        </div>

        <Button type="primary" block onClick={onCheckout}>
          Checkout
        </Button>
      </Space>
    </AntDrawer>
  );
};

export default Drawer;
