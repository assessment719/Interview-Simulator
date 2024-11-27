import { motion } from 'framer-motion';
import QuestionCentre from './component/Questionnaire';
import LoaderComponent from './component/loader';
import { loaderAtom } from './Atoms/loaderAtom';
import { RecoilRoot, useRecoilValue } from 'recoil';

function App() {

  return (
    <RecoilRoot>
      <MainContent />
    </RecoilRoot>
  )
}

function MainContent() {
  const isFetching = useRecoilValue(loaderAtom);

  return (
    <>
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Study Abroad Interview Questionnaire</h1>
            <a
              href="#"
              className="text-white font-bold bg-blue-500 rounded-xl lg:px-3 py-1 hover:text-black transition-colors duration-500"
            >
              Help
            </a>
          </div>
        </div>
      </header>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isFetching && <LoaderComponent />}
        <div className={`${!isFetching  ? 'block' : 'hidden'}`}>
          <QuestionCentre />
        </div>
      </motion.div>
    </>
  );
}

export default App;