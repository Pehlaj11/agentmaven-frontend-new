import React from 'react';
import { toast } from 'react-hot-toast';
import { createPortal } from 'react-dom';

const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "bg-blue-600 hover:bg-blue-700",
  cancelButtonClass = "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  const dialogContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {message}
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 ${cancelButtonClass}`}
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 text-white rounded-md ${confirmButtonClass}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

// Promise-based confirmation function
export const confirmAction = (options) => {
  return new Promise((resolve) => {
    const { 
      title = "Confirm Action",
      message = "Are you sure you want to perform this action?",
      confirmText = "Confirm",
      cancelText = "Cancel",
      confirmButtonClass = "bg-blue-600 hover:bg-blue-700",
      cancelButtonClass = "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
    } = options;

    const toastId = toast.custom((t) => (
      <ConfirmationDialog
        isOpen={true}
        onClose={() => {
          toast.dismiss(toastId);
          resolve(false);
        }}
        onConfirm={() => {
          toast.dismiss(toastId);
          resolve(true);
        }}
        title={title}
        message={message}
        confirmText={confirmText}
        cancelText={cancelText}
        confirmButtonClass={confirmButtonClass}
        cancelButtonClass={cancelButtonClass}
      />
    ), { 
      duration: Infinity
    });
  });
};

export default ConfirmationDialog;