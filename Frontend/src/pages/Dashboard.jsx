import { useEffect, useState } from "react";
import { addProduct, getProducts } from "../api/productApi";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import ProductForm from "../components/products/ProductForm";
import ProductTable from "../components/products/ProductTable";
import SummaryCard from "../components/products/SummaryCard";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  async function refreshProducts() {
    try {
      setProducts(await getProducts());
      setError("");
    } catch {
      setError("Could not connect to the backend. Make sure Spring Boot is running.");
    }
  }

  useEffect(() => {
    refreshProducts();
  }, []);

  async function handleAddProduct(product) {
    try {
      await addProduct(product);
      setShowForm(false);
      await refreshProducts();
    } catch {
      setError("Could not add product. Check the details and try again.");
    }
  }

  const units = products.reduce((sum, product) => sum + product.quantity, 0);
  const lowStock = products.filter(
    (product) => product.quantity <= product.lowStockThreshold
  ).length;
  const value = products.reduce(
    (sum, product) => sum + Number(product.price) * product.quantity, 0
  );

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Topbar />

        <section className="page-heading" id="overview">
          <div>
            <p className="eyebrow">YOUR INVENTORY</p>
            <h1>Overview</h1>
            <p className="subtitle">Keep track of your products and stock levels.</p>
          </div>
          <button className="primary-button" onClick={() => setShowForm(!showForm)}>
            + Add product
          </button>
        </section>

        {error && <p className="error-message">{error}</p>}
        {showForm && (
          <ProductForm onSave={handleAddProduct} onCancel={() => setShowForm(false)} />
        )}

        <section className="stats-grid">
          <SummaryCard title="Total products" value={products.length}
            note="Items in your catalogue" icon="▦" color="purple" />
          <SummaryCard title="Units in stock" value={units}
            note="Across all products" icon="↗" color="green" />
          <SummaryCard title="Low stock" value={lowStock}
            note="Need attention" icon="!" color="orange" />
          <SummaryCard title="Inventory value"
            value={`₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`}
            note="Based on current stock" icon="₹" color="blue" />
        </section>

        <ProductTable products={products} />
      </main>
    </div>
  );
}