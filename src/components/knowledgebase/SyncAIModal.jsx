import { useState, useEffect } from "react";
import { X, CheckCircle, AlertTriangle, Loader } from "lucide-react";

const SyncAIModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState("idle"); // 'idle', 'processing', 'success', 'error'
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Ready to sync knowledge base with the AI model.");

  useEffect(() => {
    if (status !== 'processing') return;

    const steps = [
      { msg: "Step 1/3: Analyzing new and updated articles...", duration: 2000, progress: 33 },
      { msg: "Step 2/3: Indexing content for AI retrieval...", duration: 2500, progress: 66 },
      { msg: "Step 3/3: Fine-tuning the language model...", duration: 3000, progress: 100 },
    ];

    let currentStep = 0;
    const processStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setMessage(step.msg);
        setTimeout(() => {
          setProgress(step.progress);
          currentStep++;
          processStep();
        }, step.duration);
      } else {
        // Finished successfully
        setStatus('success');
        setMessage('✅ AI model has been successfully updated!');
      }
    };
    
    processStep();

  }, [status]);
  
  const handleStart = () => {
    setStatus('processing');
    setProgress(0);
  };
  
  const handleClose = () => {
    setStatus('idle');
    setProgress(0);
    setMessage("Ready to sync knowledge base with the AI model.");
    onClose();
  }

  if (!isOpen) return null;
  
  const renderContent = () => {
    switch(status) {
      case 'processing':
        return (
          <div className="text-center">
            <Loader className="animate-spin h-12 w-12 mx-auto text-green-500 mb-4" />
            <p className="text-lg font-medium dark:text-white">{message}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-4">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 1s ease-in-out' }}></div>
            </div>
          </div>
        );
      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
            <p className="text-lg font-medium dark:text-white">{message}</p>
          </div>
        );
      case 'error':
        return (
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <p className="text-lg font-medium dark:text-white">{message}</p>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <p className="text-lg mb-6 dark:text-gray-300">
              This will update the AI agent with the latest articles from the knowledge base. This process may take a few minutes.
            </p>
          </div>
        );
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Sync & Train AI</h3>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        </div>
        <div className="my-8">
          {renderContent()}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          {status === 'idle' && (
            <>
              <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                Cancel
              </button>
              <button onClick={handleStart} className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600">
                Start Sync & Train
              </button>
            </>
          )}
          {(status === 'success' || status === 'error') && (
             <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Close
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncAIModal;