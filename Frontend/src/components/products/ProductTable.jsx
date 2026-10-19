export default function ProductTable({ products }) {
  return (
    <section className="table-card" id="products">
      <div className="table-heading">
        <div>
          <h2>Product inventory</h2>
          <p>Your products and current stock levels</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <h3>No products yet</h3>
          <p>Add a product to start tracking your inventory.</p>
        </div>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>PRODUCT</th><th>SKU</th><th>CATEGORY</th>
                <th>PRICE</th><th>QUANTITY</th><th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const isLow = product.quantity <= product.lowStockThreshold;
                return (
                  <tr key={product.id}>
                    <td><strong>{product.name}</strong></td>
                    <td>{product.sku}</td>
                    <td>{product.category || "—"}</td>
                    <td>₹{Number(product.price).toLocaleString("en-IN")}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <span className={`status ${isLow ? "low" : "in-stock"}`}>
                        {isLow ? "Low stock" : "In stock"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}