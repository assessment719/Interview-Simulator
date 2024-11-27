import { Book, Video, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const resources = [
  {
    title: "USA Student Visa Interview Guide",
    type: "document",
    category: "Visa Interview",
    downloadUrl: "https://drive.usercontent.google.com/u/0/uc?id=19MvFQE4bC3Oy4MUbVjPb1i6zLk0gismz&export=download",
    icon: FileText,
  },
  {
    title: "Common Credibility Questions",
    type: "video",
    category: "Preparation",
    downloadUrl: "https://drive.usercontent.google.com/u/0/uc?id=19MvFQE4bC3Oy4MUbVjPb1i6zLk0gismz&export=download",
    icon: Video,
  },
  {
    title: "Financial Documentation Checklist",
    type: "document",
    category: "Documentation",
    downloadUrl: "https://drive.usercontent.google.com/u/0/uc?id=19MvFQE4bC3Oy4MUbVjPb1i6zLk0gismz&export=download",
    icon: Book,
  },
];

const ResourceCenter = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <resource.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.category}</p>
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-blue-600" />
                  <a
                    href={resource.downloadUrl}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Download Resource
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Recommendations To Preapare For Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-lg">
            <h3 className="font-semibold mb-2">Financial Documentation Guide</h3>
            <p className="text-sm opacity-90">Improve your understanding of required financial documents and how to present them effectively.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-lg">
            <h3 className="font-semibold mb-2">Future Plans Workshop</h3>
            <p className="text-sm opacity-90">Learn how to articulate your post-graduation plans and career objectives clearly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCenter;