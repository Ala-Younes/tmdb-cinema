import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-20 h-20 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        <div className="w-20 h-20 border-r-4 border-l-4 border-transparent border-t-4 border-blue-300 rounded-full animate-spin absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        <div className="w-20 h-20 border-t-4 border-blue-600 rounded-full animate-pulse absolute top-0 left-0 opacity-60"></div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Loading</h3>
        <p className="text-gray-600 dark:text-gray-300">Please wait while we fetch the movies...</p>
      </motion.div>
    </div>
  );
};

export default Spinner;
