export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">✦</span>
        <span>Stockwise</span>
      </div>

      <p className="nav-label">WORKSPACE</p>
      <a className="nav-item active" href="#overview">▦ <span>Overview</span></a>
      <a className="nav-item" href="#products">□ <span>Products</span></a>
      <a className="nav-item" href="#suppliers">♧ <span>Suppliers</span></a>

      <div className="sidebar-bottom">
        <div className="user-avatar">Y</div>
        <div><strong>Inventory team</strong><small>Workspace</small></div>
      </div>
    </aside>
  );
}