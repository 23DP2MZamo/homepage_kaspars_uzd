import './Sidebar.css';

export default function Sidebar({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  onAddCategory,
  onDeleteCategory,
  onLogout 
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>To-Do List</h2>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${!selectedCategory ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          <span>Visi uzdevumi</span>
        </button>

        <div className="categories-section">
          <div className="categories-header">
            <h3>Kategorijas</h3>
            <button className="add-category-btn" onClick={onAddCategory} title="Pievienot kategoriju">
              +
            </button>
          </div>

          <div className="categories-list">
            {categories.map(category => (
              <div
                key={category.id}
                className={`nav-item category-item ${selectedCategory?.id === category.id ? 'active' : ''}`}
                onClick={() => onSelectCategory(category)}
              >
                <span 
                  className="category-color" 
                  style={{ backgroundColor: category.color }}
                ></span>
                <span className="category-name">{category.name}</span>
                <button
                  className="delete-category-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.confirm(`Dzēst kategoriju "${category.name}"?`)) {
                      onDeleteCategory(category.id);
                    }
                  }}
                  title="Dzēst kategoriju"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          Iziet
        </button>
      </div>
    </aside>
  );
}
