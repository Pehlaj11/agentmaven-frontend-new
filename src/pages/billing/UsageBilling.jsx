import { useState } from "react";
import { usageAndBillingData as initialData } from "../../api/mockData";
import DashboardPage from '../../components/dashboard/DashboardPage';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import UsageBillingGrid from '../../components/billing/UsageBillingGrid';
import ChangePlanModal from "../../components/billing/ChangePlanModal";
import UpdatePaymentModal from "../../components/billing/UpdatePaymentModal";

export const UsageAndBilling = () => {
    // State for the entire page, initialized with your mock data
    const [currentPlan, setCurrentPlan] = useState(initialData.currentPlan);
    const [paymentMethod, setPaymentMethod] = useState(initialData.paymentMethod);
    const { usage, billingHistory } = initialData; // Static for this prototype

    // State to control modal visibility
    const [isPlanModalOpen, setPlanModalOpen] = useState(false);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

    // --- HANDLER FUNCTIONS ---
    const handlePlanChange = (newPlan) => {
        // In a real app, this would be an API call. Here we simulate it.
        const updatedPlan = {
            ...newPlan,
            renewalDate: "October 25, 2025" // Simulate new renewal date
        };
        setCurrentPlan(updatedPlan);
        setPlanModalOpen(false); // Close modal on success
    };

    const handlePaymentUpdate = (newPaymentDetails) => {
        // Simulate updating payment method
        setPaymentMethod(newPaymentDetails);
        setPaymentModalOpen(false);
    };

    return (
        <DashboardPage>
            <DashboardHeader
                title="Usage & Billing"
                actions={
                    <button 
                        onClick={() => setPlanModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Change Plan
                    </button>
                }
            />
            
            <UsageBillingGrid />
            
            {/* --- MODALS --- */}
            <ChangePlanModal
                isOpen={isPlanModalOpen}
                onClose={() => setPlanModalOpen(false)}
                currentPlanName={currentPlan.name}
                onSave={handlePlanChange}
            />

            <UpdatePaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setPaymentModalOpen(false)}
                onSave={handlePaymentUpdate}
            />
        </DashboardPage>
    );
};