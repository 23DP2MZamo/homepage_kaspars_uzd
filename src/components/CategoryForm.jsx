import { useState } from 'react';
import './CategoryForm.css';

const COLORS = [
  '#ff6b6b', '#4ecdc4', '#ffa726', '#ef5350', '#ab47bc',
  '#ec407a', '#26c6da', '#66bb6a', '#ff7043', '#42a5f5'
];

export default function CategoryForm({ onSave, onClose }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      color,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content category-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Jauna kategorija</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label htmlFor="categoryName">Kategorijas nosaukums *</label>
            <input
              type="text"
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Piemēram: Darbs, Personīgais, Pirkumi..."
              required
            />
          </div>

          <div className="form-group">
            <label>Krāsa</label>
            <div className="color-picker">
              {COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  className={`color-option ${color === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  title={c}
                />
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Atcelt
            </button>
            <button type="submit" className="btn-primary">
              Izveidot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
