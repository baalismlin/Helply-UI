import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function TaskList({ searchQuery, selectedCategory }) {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchTasks = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockTasks = [
          {
            id: 1,
            title: 'Professional Photography',
            description: 'High-quality photos for your events',
            price: 50,
            category: 'photography',
            city: 'New York',
            provider: 'John Doe',
            providerId: 'user123',
            image: 'https://via.placeholder.com/300x200'
          },
          {
            id: 2,
            title: 'Dog Walking Task',
            description: 'Daily walks for your furry friends',
            price: 25,
            category: 'pet_care',
            city: 'Boston',
            provider: 'Jane Smith',
            providerId: 'user456',
            image: 'https://via.placeholder.com/300x200'
          },
          {
            id: 3,
            title: 'Graphic Design',
            description: 'Custom logos and branding materials',
            price: 100,
            category: 'design',
            city: 'San Francisco',
            provider: 'Mike Johnson',
            providerId: 'user789',
            image: 'https://via.placeholder.com/300x200'
          }
        ];
        
        setTasks(mockTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);
  
  // Filter tasks based on search query and selected category
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchQuery === '' || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || task.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  if (loading) {
    return <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div></div>;
  }
  
  if (filteredTasks.length === 0) {
    return <div className="text-center py-10 text-gray-500">{t('no_tasks_found')}</div>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTasks.map(task => (
        <Link 
          to={`/task/${task.id}`} 
          key={task.id} 
          className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
        >
          <img src={task.image} alt={task.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
            <p className="mt-1 text-gray-600 text-sm line-clamp-2">{task.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-blue-600 font-bold">${task.price}</span>
              <span className="text-sm text-gray-500">{task.city}</span>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm text-gray-500">{task.provider}</span>
              <button 
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation to detail page
                  // This would open the chat with the provider
                }}
              >
                {t('contact')}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TaskList;
