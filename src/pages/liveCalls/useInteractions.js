import { useState } from "react";
import { toast } from 'react-hot-toast';

export const useInteractions = () => {
  const [activeInteraction, setActiveInteraction] = useState({ callId: null, type: null });

  const handleInteraction = (callId, type, number) => {
    setActiveInteraction({ callId, type });
    
    const actionLabels = {
      listen: 'Listening to',
      whisper: 'Whispering to',
      barge: 'Barging into'
    };
    
    toast.success(`Started ${actionLabels[type]} call ${number}`, {
      duration: 3000,
      position: 'bottom-right',
    });
    
    console.log(`Started ${type} with call ${number}`);
  };

  const endInteraction = () => {
    toast.success('Interaction ended', {
      duration: 2000,
      position: 'bottom-right',
    });
    
    console.log("Interaction ended");
    setActiveInteraction({ callId: null, type: null });
  };

  return { activeInteraction, handleInteraction, endInteraction };
};