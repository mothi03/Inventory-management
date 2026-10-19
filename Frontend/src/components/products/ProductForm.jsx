import { useState } from "react";

const initialForm = {
  name: "",
  sku: "",
  category: "",
  price: "",
  quantity: "",
  lowStockThreshold: 5,
};

export default function ProductForm({ onSave, onCancel }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await onSave({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
      lowStockThreshold: Number(form.lowStockThreshold),
    });

    setForm(initialForm);
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <h2>Add a product</h2>
          <p>Enter the details for your new inventory item.</p>
        </div>
        <button type="button" className="close-button" onClick={onCancel}>×</button>
      </div>

      <div className="form-grid">
        <label>Product name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>SKU
          <input name="sku" value={form.sku} onChange={handleChange} required />
        </label>
        <label>Category
          <input name="category" value={form.category} onChange={handleChange} />
        </label>
        <label>Price
          <input name="price" type="number" min="0" step="0.01"
            value={form.price} onChange={handleChange} required />
        </label>
        <label>Quantity
          <input name="quantity" type="number" min="0"
            value={form.quantity} onChange={handleChange} required />
        </label>
        <label>Low-stock alert at
          <input name="lowStockThreshold" type="number" min="0"
            value={form.lowStockThreshold} onChange={handleChange} required />
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="secondary-button" onClick={onCancel}>Cancel</button>
        <button type="submit" className="primary-button">Save product</button>
      </div>
    </form>
  );
}