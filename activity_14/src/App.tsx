import React from "react";
import "antd/dist/reset.css";
import { Layout, Row, Col, Typography, message } from "antd";
import ProductTable, { type Product } from "./components/Table";
import CartDrawer, { type CartItem } from "./components/Drawer";
import SummaryCard, { type DiscountType } from "./components/Card";

const { Header, Content } = Layout;
const { Title } = Typography;

const sampleProducts: Product[] = [
  { id: 1, name: "Mouse", price: 19.99 },
  { id: 2, name: "Laptop", price: 29.5 },
  { id: 3, name: "Keyboard", price: 9.99 },
  { id: 4, name: "Monitor", price: 19.99 },
];

const App: React.FC = () => {
  const [products] = React.useState<Product[]>(sampleProducts);
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const discountType: DiscountType = "percent";

  const addToCart = (product: Product, qty: number) => {
    setCart((c) => {
      const found = c.find((i) => i.product.id === product.id);
      if (found) {
        return c.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...c, { product, qty }];
    });
  };

  const updateQty = (productId: number, qty: number) => {
    setCart((c) =>
      c.map((i) => (i.product.id === productId ? { ...i, qty } : i)),
    );
  };

  const removeItem = (productId: number) =>
    setCart((c) => c.filter((i) => i.product.id !== productId));

  const handleCheckout = () => {
    setCart([]);
    setDrawerOpen(false);
    message.success("Checkout complete. Cart cleared.");
  };

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const discountValue = Math.min(100, Math.floor(subtotal / 100) * 5);
  const discountAmount = subtotal * (discountValue / 100);
  const grandTotal = Math.max(0, subtotal - discountAmount);

  return (
    <Layout style={{ minHeight: "100vh", padding: 24 }}>
      <Header style={{ background: "transparent", padding: 0 }}>
        <Title level={2}>Products</Title>
      </Header>
      <Content style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col xs={24} lg={16}>
            <ProductTable products={products} onAddToCart={addToCart} />
          </Col>
          <Col xs={24} lg={8}>
            <SummaryCard
              subtotal={subtotal}
              discountType={discountType}
              discountValue={discountValue}
              grandTotal={grandTotal}
              onOpenCart={() => setDrawerOpen(true)}
            />
          </Col>
        </Row>
      </Content>

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cart={cart}
        updateQty={updateQty}
        removeItem={removeItem}
        discountType={discountType}
        discountValue={discountValue}
        onCheckout={handleCheckout}
      />
    </Layout>
  );
};

export default App;
