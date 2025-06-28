import { useTranslation } from 'react-i18next';

function TaskCategories({ selectedCategory, setSelectedCategory }) {
  const { t } = useTranslation();
  
  const categories = [
    { id: 'errands', icon: '🏃' },
    { id: 'pet_care', icon: '🐾' },
    { id: 'photography', icon: '📸' },
    { id: 'driving', icon: '🚗' },
    { id: 'design', icon: '🎨' },
    { id: 'writing', icon: '✍️' },
    { id: 'translation', icon: '🌐' },
    { id: 'remote_assistance', icon: '💻' }
  ];
  
  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium mb-3">{t('categories')}</h2>
      <div className="flex flex-wrap gap-3">
        <button
          className={`px-4 py-2 rounded-full ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedCategory(null)}
        >
          {t('all')}
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full flex items-center ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="mr-2">{category.icon}</span>
            {t(category.id)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskCategories;
