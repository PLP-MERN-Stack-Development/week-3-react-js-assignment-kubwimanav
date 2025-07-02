import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import {
  Search,
  Plus,
  Trash2,
  Check,
  Moon,
  Sun,
  Users,
  Home,
  CheckSquare,
} from "lucide-react";

// Theme Context
const ThemeContext = createContext();

// Custom hook for localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage?.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof Storage !== "undefined") {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return [storedValue, setValue];
};

// Button Component
const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Component
const Card = ({ children, className = "", title, ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

// Navbar Component
const Navbar = ({ currentPage, onPageChange }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "tasks", label: "Task Manager", icon: CheckSquare },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              TaskFlow
            </h1>
            <div className="flex space-x-4">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onPageChange(id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === id
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              TaskFlow
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A modern task management application built with React and Tailwind
              CSS.
            </p>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  API
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © 2025 TaskFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Layout Component
const Layout = ({ children, currentPage, onPageChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar currentPage={currentPage} onPageChange={onPageChange} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

// Task Manager Component
const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card title="Task Manager" className="mb-6">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <Button onClick={addTask}>
            <Plus size={16} />
            Add Task
          </Button>
        </div>

        <div className="flex gap-2 mb-6">
          {["all", "active", "completed"].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "primary" : "secondary"}
              size="sm"
              onClick={() => setFilter(filterType)}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)} (
              {taskCounts[filterType]})
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {filter === "all"
                ? "No tasks yet. Add one above!"
                : `No ${filter} tasks.`}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  task.completed
                    ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                    : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 dark:border-gray-600 hover:border-green-500"
                  }`}
                >
                  {task.completed && <Check size={14} />}
                </button>
                <span
                  className={`flex-1 ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {task.text}
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

// Users Component (API Integration)
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="text-center">
          <div className="text-red-600 dark:text-red-400">
            <h3 className="text-lg font-semibold mb-2">Error Loading Users</h3>
            <p>{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Users Directory
        </h2>
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-blue-600 dark:text-blue-300">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    @{user.username}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Email:</span>
                  <span className="ml-2">{user.email}</span>
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2">{user.phone}</span>
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Company:</span>
                  <span className="ml-2">{user.company.name}</span>
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Website:</span>
                  <span className="ml-2">{user.website}</span>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "primary" : "secondary"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

// Home Component
const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to TaskFlow
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          A comprehensive React application demonstrating modern web development
          practices with state management, API integration, and responsive
          design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card title="Task Management">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create, complete, and organize your tasks with our intuitive task
            manager.
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Add and delete tasks</li>
            <li>• Mark tasks as completed</li>
            <li>• Filter by status</li>
            <li>• Persistent storage</li>
          </ul>
        </Card>

        <Card title="User Directory">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Browse through our user directory with search and pagination
            features.
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Real-time API data</li>
            <li>• Search functionality</li>
            <li>• Pagination support</li>
            <li>• Responsive cards</li>
          </ul>
        </Card>

        <Card title="Modern Design">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Experience our modern, responsive design with dark mode support.
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Dark/Light mode toggle</li>
            <li>• Responsive layout</li>
            <li>• Smooth animations</li>
            <li>• Accessible design</li>
          </ul>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">
          Built with Modern Technologies
        </h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">React 18</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">
            Tailwind CSS
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full">
            React Hooks
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full">
            Context API
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full">
            Custom Hooks
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full">
            API Integration
          </span>
        </div>
      </div>
    </div>
  );
};

// Theme Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "tasks":
        return <TaskManager />;
      case "users":
        return <Users />;
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </Layout>
    </ThemeProvider>
  );
};

export default App;
