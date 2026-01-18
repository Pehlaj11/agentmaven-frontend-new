import React, { useState } from "react";
import Modal from "../shared/Modal";
import FormInput from "../shared/FormInput";
import FormButton from "../shared/FormButton";
import { toast } from "react-hot-toast";

const UpdatePaymentModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv ||
      !formData.cardholderName
    ) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    // In a real app, you would process the payment method update here
    onSave(formData);
    toast.success("Payment method updated successfully!");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Payment Method"
      size="md"
      actions={
        <>
          <FormButton variant="outline" onClick={onClose}>
            Cancel
          </FormButton>
          <FormButton onClick={handleSubmit}>
            Save Payment Method
          </FormButton>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Card Number"
          type="text"
          value={formData.cardNumber}
          onChange={(value) => handleChange("cardNumber", value)}
          placeholder="1234 5678 9012 3456"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Expiry Date"
            type="text"
            value={formData.expiryDate}
            onChange={(value) => handleChange("expiryDate", value)}
            placeholder="MM/YY"
          />
          <FormInput
            label="CVV"
            type="text"
            value={formData.cvv}
            onChange={(value) => handleChange("cvv", value)}
            placeholder="123"
          />
        </div>
        <FormInput
          label="Cardholder Name"
          type="text"
          value={formData.cardholderName}
          onChange={(value) => handleChange("cardholderName", value)}
          placeholder="John Doe"
        />
      </form>
    </Modal>
  );
};

export default UpdatePaymentModal;