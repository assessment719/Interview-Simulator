import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { Laptop, BarChart2, BookOpen } from 'lucide-react';
import InterviewSimulator from './components/InterviewSimulator';
import Dashboard from './components/Dashboard';
import ResourceCenter from './components/ResourceCenter';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Study Abroad Interview Preparation</h1>
            <a
              href="#"
              className="text-white font-bold bg-blue-500 rounded-xl lg:px-3 py-1 hover:text-black transition-colors duration-500"
            >
              Help
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm mb-8 font-bold">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
              { id: 'simulator', label: 'Interview Simulator', icon: Laptop },
              { id: 'resources', label: 'Resource Center', icon: BookOpen },
            ].map(({ id, label, icon: Icon }) => (
              <Tabs.Trigger
                key={id}
                value={id}
                className={`
                  flex-1 px-4 py-2 flex items-center justify-center space-x-2 
                  rounded-lg transition-colors duration-200 cursor-pointer
                  ${activeTab === id
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Tabs.Content value="dashboard">
              <Dashboard />
            </Tabs.Content>

            <Tabs.Content value="simulator" forceMount>
              <div
                className={`${activeTab !== 'simulator' ? 'hidden' : 'block'
                  }`}
              >
                <InterviewSimulator />
              </div>
            </Tabs.Content>

            <Tabs.Content value="resources">
              <ResourceCenter />
            </Tabs.Content>
          </motion.div>
        </Tabs.Root>
      </main>
    </div>
  );
}

export default App;