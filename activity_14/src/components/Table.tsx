import React from "react";
import { Table as AntTable, Button, InputNumber, Space } from "antd";
import type { ColumnsType } from "antd/es/table";

export type Product = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  products: Product[];
  onAddToCart: (product: Product, qty: number) => void;
};

const ProductTable: React.FC<Props> = ({ products, onAddToCart }) => {
  const [qtys, setQtys] = React.useState<Record<number, number>>({});

  const setQty = (id: number, val: number | null) => {
    setQtys((s) => ({ ...s, [id]: val ?? 1 }));
  };

  const columns: ColumnsType<Product> = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (v: number) => `$${v.toFixed(2)}`,
    },
    {
      title: "Quantity",
      key: "qty",
      render: (_: any, record: Product) => (
        <InputNumber
          min={1}
          defaultValue={1}
          value={qtys[record.id] ?? 1}
          onChange={(v) => setQty(record.id, v)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Product) => (
        <Space>
          <Button
            type="primary"
            onClick={() => onAddToCart(record, qtys[record.id] ?? 1)}
          >
            Add to cart
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AntTable
      rowKey="id"
      columns={columns}
      dataSource={products}
      pagination={false}
    />
  );
};

export default ProductTable;
