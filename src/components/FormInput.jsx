import { useTranslation } from 'react-i18next';

function FormInput({ id, type, value, onChange, required = false, autoComplete = 'on' }) {
  const { t } = useTranslation();
  
  return (
    <div>
      <label className="block text-gray-700 mb-2" htmlFor={id}>
        {t(id)}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export default FormInput;