import { Check, Copy, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import DashboardPage from '../../components/dashboard/DashboardPage';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import ApiKeysGrid from '../../components/apikeys/ApiKeysGrid';

export const ApiKeys = () => {
  return (
    <DashboardPage>
      <ApiKeysGrid />
    </DashboardPage>
  );
};
