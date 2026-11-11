import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { SaleReceiptData, PosCartItem } from "../../types";

const styles = StyleSheet.create({
  page: {
    padding: 16,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#1e293b",
    backgroundColor: "#ffffff",
  },
  header: {
    textAlign: "center",
    marginBottom: 8,
  },
  storeName: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  storePhone: {
    fontSize: 8,
    color: "#64748b",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    borderBottomStyle: "dashed",
    marginVertical: 6,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  metaLabel: {
    color: "#64748b",
  },
  metaValue: {
    fontFamily: "Helvetica-Bold",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 3,
    marginBottom: 4,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#64748b",
  },
  colItem: {
    width: "55%",
  },
  colQty: {
    width: "15%",
    textAlign: "center",
  },
  colAmount: {
    width: "30%",
    textAlign: "right",
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  itemName: {
    fontFamily: "Helvetica-Bold",
  },
  itemSub: {
    fontSize: 7.5,
    color: "#64748b",
  },
  totalSection: {
    marginTop: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  footerText: {
    textAlign: "center",
    fontSize: 8,
    color: "#64748b",
    marginTop: 8,
  },
});

export default function PosThermalPdfDocument({
  receipt,
}: {
  receipt: SaleReceiptData;
}) {
  const totalQuantity = receipt.items.reduce(
    (acc: number, item: PosCartItem) => acc + item.quantity,
    0
  );

  return (
    <Document>
      <Page size={[226, 450]} style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.storeName}>
            {receipt.storeName || "SONAR BANGLA"}
          </Text>
          <Text style={styles.storePhone}>
            Tel: {receipt.storePhone || "01907641877"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{receipt.date}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Time</Text>
            <Text style={styles.metaValue}>{receipt.time}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Order</Text>
            <Text style={styles.metaValue}>{receipt.orderNumber}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Channel</Text>
            <Text style={styles.metaValue}>{receipt.channel}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Payment</Text>
            <Text style={styles.metaValue}>{receipt.paymentMethod}</Text>
          </View>
          {receipt.customerName ? (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Customer</Text>
              <Text style={styles.metaValue}>{receipt.customerName}</Text>
            </View>
          ) : null}
          {receipt.customerPhone ? (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Phone</Text>
              <Text style={styles.metaValue}>{receipt.customerPhone}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.divider} />

        <View style={styles.tableHeader}>
          <Text style={styles.colItem}>ITEM</Text>
          <Text style={styles.colQty}>QTY</Text>
          <Text style={styles.colAmount}>AMOUNT</Text>
        </View>

        <View>
          {receipt.items.map((item: PosCartItem) => (
            <View key={item.product.id} style={styles.itemRow}>
              <View style={styles.colItem}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.itemSub}>{item.product.price}৳ each</Text>
              </View>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colAmount}>
                {(item.product.price * item.quantity).toFixed(2).replace(/\.00$/, "")}৳
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.metaLabel}>Items ({totalQuantity})</Text>
            <Text style={styles.metaValue}>
              {receipt.total.toFixed(2).replace(/\.00$/, "")}৳
            </Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text>TOTAL</Text>
            <Text>{receipt.total.toFixed(2).replace(/\.00$/, "")}৳</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.footerText}>Thank you for shopping</Text>
      </Page>
    </Document>
  );
}
