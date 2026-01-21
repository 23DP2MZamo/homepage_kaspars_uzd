import './TaskList.css';

export default function TaskList({ tasks, categories, onToggleComplete, onEdit, onDelete }) {
  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || '#6b7280';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { text: 'Augsts', class: 'priority-high' },
      medium: { text: 'Vidējs', class: 'priority-medium' },
      low: { text: 'Zems', class: 'priority-low' },
    };
    return badges[priority] || badges.medium;
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>Nav uzdevumu</h3>
        <p>Izveidojiet savu pirmo uzdevumu, lai sāktu!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => {
        const priorityBadge = getPriorityBadge(task.priority);
        return (
          <div 
            key={task.id} 
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <div className="task-checkbox">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                id={`task-${task.id}`}
              />
              <label htmlFor={`task-${task.id}`}></label>
            </div>

            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              <div className="task-meta">
                <span 
                  className="task-category-badge"
                  style={{ backgroundColor: getCategoryColor(task.category_id) + '20', color: getCategoryColor(task.category_id) }}
                >
                  {categories.find(c => c.id === task.category_id)?.name || 'Bez kategorijas'}
                </span>
                <span className={`priority-badge ${priorityBadge.class}`}>
                  {priorityBadge.text}
                </span>
              </div>
            </div>

            <div className="task-actions">
              <button 
                className="btn-icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(task);
                }}
                title="Rediģēt"
                type="button"
              >
                Rediģēt
              </button>
              <button 
                className="btn-icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (window.confirm('Dzēst šo uzdevumu?')) {
                    onDelete(task.id);
                  }
                }}
                title="Dzēst"
                type="button"
              >
                Dzēst
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
