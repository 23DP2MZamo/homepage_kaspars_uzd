import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import CategoryForm from '../components/CategoryForm';
import './Dashboard.css';

export default function Dashboard() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Darbs', color: '#ff6b6b' },
    { id: 2, name: 'Personīgais', color: '#4ecdc4' },
    { id: 3, name: 'Pirkumi', color: '#ffa726' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Iemācīties Laravel', completed: false, category_id: 1, priority: 'high' },
    { id: 2, title: 'Nopirkt pārtiku', completed: false, category_id: 3, priority: 'medium' },
    { id: 3, title: 'Piezvanīt mammai', completed: true, category_id: 2, priority: 'low' },
  ]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Загрузить категории и задачи из API
    // const loadData = async () => {
    //   const categoriesData = await axios.get('/api/categories');
    //   const tasksData = await axios.get('/api/tasks');
    //   setCategories(categoriesData.data);
    //   setTasks(tasksData.data);
    // };
    // loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      id: tasks.length + 1,
      ...taskData,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
    // TODO: Отправить на сервер
  };

  const handleUpdateTask = (taskData) => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...task, ...taskData } : task
    ));
    setEditingTask(null);
    setShowTaskForm(false);
    // TODO: Отправить на сервер
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    // TODO: Отправить на сервер
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    // TODO: Отправить на сервер
  };

  const handleAddCategory = (categoryData) => {
    const newCategory = {
      id: categories.length + 1,
      ...categoryData,
    };
    setCategories([...categories, newCategory]);
    setShowCategoryForm(false);
    // TODO: Отправить на сервер
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
    setTasks(prevTasks => prevTasks.filter(task => task.category_id !== categoryId));
    setSelectedCategory(prevSelected => {
      if (prevSelected?.id === categoryId) {
        return null;
      }
      return prevSelected;
    });
    // TODO: Отправить на сервер
  };

  const filteredTasks = selectedCategory
    ? tasks.filter(task => task.category_id === selectedCategory.id)
    : tasks;

  return (
    <div className="dashboard">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddCategory={() => setShowCategoryForm(true)}
        onDeleteCategory={handleDeleteCategory}
        onLogout={handleLogout}
      />
      
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>{selectedCategory ? selectedCategory.name : 'Visi uzdevumi'}</h1>
            <p className="task-count">{filteredTasks.length} uzdevumi</p>
          </div>
          <button 
            className="btn-primary"
            onClick={() => {
              setEditingTask(null);
              setShowTaskForm(true);
            }}
          >
            + Jauns uzdevums
          </button>
        </header>

        <TaskList
          tasks={filteredTasks}
          categories={categories}
          onToggleComplete={handleToggleComplete}
          onEdit={(task) => {
            setEditingTask(task);
            setShowTaskForm(true);
          }}
          onDelete={handleDeleteTask}
        />
      </div>

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          categories={categories}
          onSave={editingTask ? handleUpdateTask : handleAddTask}
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}

      {showCategoryForm && (
        <CategoryForm
          onSave={handleAddCategory}
          onClose={() => setShowCategoryForm(false)}
        />
      )}
    </div>
  );
}
