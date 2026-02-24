import { useState } from "react";
import { Plus, X } from "lucide-react";

const ServiceForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "HR");
  const [price, setPrice] = useState(initialData?.price || "");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      title, 
      description, 
      category,
      price: price ? Number(price) : undefined,
      duration: duration ? Number(duration) : undefined,
      isFeatured
    });
    if (!initialData) {
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("HR");
    setPrice("");
    setDuration("");
    setIsFeatured(false);
  };

  const categories = [
    { value: "HR", label: "HR Services" },
    { value: "Personal Development", label: "Personal Development" },
    { value: "Career Coaching", label: "Career Coaching" },
    { value: "Leadership", label: "Leadership Training" },
    { value: "Wellness", label: "Wellness Programs" },
  ];

  return (
    <form 
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "#D0DDEE" }}>
        <h3 
          className="text-lg font-semibold"
          style={{ color: "#194C63" }}
        >
          {initialData ? "Edit Service" : "Add New Service"}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded-full hover:opacity-80 transition-all"
            style={{ color: "#B3785A" }}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Title */}
        <div className="md:col-span-2">
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: "#3C637B" }}
          >
            Service Title *
          </label>
          <input
            placeholder="e.g., Executive Coaching Session"
            className="w-full p-3 rounded transition-all focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "#F5FAFD",
              border: "1px solid #AAB6CB",
              color: "#0C0D14"
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: "#3C637B" }}
          >
            Category *
          </label>
          <select
            className="w-full p-3 rounded transition-all focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "#F5FAFD",
              border: "1px solid #AAB6CB",
              color: "#0C0D14"
            }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: "#3C637B" }}
          >
            Price (USD)
          </label>
          <div className="relative">
            <span 
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: "#748DB0" }}
            >
              $
            </span>
            <input
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full pl-8 p-3 rounded transition-all focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "#F5FAFD",
                border: "1px solid #AAB6CB",
                color: "#0C0D14"
              }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: "#3C637B" }}
          >
            Duration (hours)
          </label>
          <div className="relative">
            <span 
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              style={{ color: "#748DB0" }}
            >
              hours
            </span>
            <input
              type="number"
              placeholder="e.g., 2"
              min="0"
              step="0.5"
              className="w-full pr-16 p-3 rounded transition-all focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "#F5FAFD",
                border: "1px solid #AAB6CB",
                color: "#0C0D14"
              }}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: "#F5FAFD", border: "1px solid #D0DDEE" }}>
          <div>
            <p className="font-medium" style={{ color: "#0C0D14" }}>Featured Service</p>
            <p className="text-sm" style={{ color: "#748DB0" }}>Highlight this service on the homepage</p>
          </div>
          <button
            type="button"
            onClick={() => setIsFeatured(!isFeatured)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isFeatured ? 'justify-end' : 'justify-start'}`}
            style={{
              backgroundColor: isFeatured ? "#194C63" : "#AAB6CB"
            }}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isFeatured ? 'translate-x-1' : 'translate-x-6'}`} />
          </button>
        </div>
      </div>

      {/* Description */}
      <div>
        <label 
          className="block text-sm font-medium mb-2"
          style={{ color: "#3C637B" }}
        >
          Description *
        </label>
        <textarea
          placeholder="Describe the service in detail, including key benefits and what clients can expect..."
          rows={4}
          className="w-full p-3 rounded transition-all focus:outline-none focus:ring-2 resize-none"
          style={{
            backgroundColor: "#F5FAFD",
            border: "1px solid #AAB6CB",
            color: "#0C0D14"
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <p className="text-xs mt-1" style={{ color: "#AAB6CB" }}>
          {description.length}/500 characters
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: "#D0DDEE" }}>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded font-medium transition-all hover:opacity-80"
            style={{
              backgroundColor: "#F5FAFD",
              color: "#194C63",
              border: "1px solid #AAB6CB"
            }}
          >
            Cancel
          </button>
        )}
        <button 
          type="submit"
          className="px-5 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2"
          style={{
            backgroundColor: "#194C63",
            color: "#F5FAFD"
          }}
        >
          <Plus className="w-4 h-4" />
          {initialData ? "Update Service" : "Add Service"}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;