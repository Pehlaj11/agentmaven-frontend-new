import React, { useState } from "react";
import Modal from "../shared/Modal";
import FormInput from "../shared/FormInput";
import FormTextarea from "../shared/FormTextarea";
import FormSelect from "../shared/FormSelect";
import FormButton from "../shared/FormButton";
import { toast } from "react-hot-toast";

const CreateArticleModal = ({ isOpen, onClose, onSave, categories }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: categories[0] || "",
    content: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.title || !formData.category || !formData.content) {
      toast.error("Please fill out all fields.");
      return;
    }
    // In a real app, you would save the article to your database/API here
    onSave({
      ...formData,
      id: Date.now(), // Simple ID generation for demo
      lastUpdated: new Date().toISOString().split("T")[0],
      featured: false,
      aiAccessCount: 0,
      successRate: 0,
    });
    toast.success("Article created successfully!");
    // Reset form
    setFormData({ title: "", category: categories[0] || "", content: "" });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Article"
      size="lg"
      actions={
        <>
          <FormButton variant="outline" onClick={onClose}>
            Cancel
          </FormButton>
          <FormButton onClick={handleSubmit}>
            Create Article
          </FormButton>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Title"
          type="text"
          value={formData.title}
          onChange={(value) => handleChange("title", value)}
          placeholder="How to reset your password"
        />
        <FormSelect
          label="Category"
          value={formData.category}
          onChange={(value) => handleChange("category", value)}
          options={categories}
        />
        <FormTextarea
          label="Content"
          value={formData.content}
          onChange={(value) => handleChange("content", value)}
          placeholder="Detailed instructions on how to reset your password..."
          rows={6}
        />
      </form>
    </Modal>
  );
};

export default CreateArticleModal;