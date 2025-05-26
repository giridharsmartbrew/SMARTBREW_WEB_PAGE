import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <motion.button
      className="relative p-2 rounded-full bg-dark-800 dark:bg-white/10"
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 0 : 180 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative w-6 h-6"
      >
        {isDarkMode ? (
          <Moon className="absolute inset-0 text-gray-300" />
        ) : (
          <Sun className="absolute inset-0 text-dark-900" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;