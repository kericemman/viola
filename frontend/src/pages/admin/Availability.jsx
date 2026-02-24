import { useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";
import { Calendar, Clock, Save, Plus, Trash2, CheckCircle } from "lucide-react";

const Availability = () => {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [savedSlots, setSavedSlots] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !slots) {
      alert("Please select a date and enter time slots");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/availability", {
        date,
        slots: slots.split(",").map((s) => s.trim()),
      });

      setSuccess(true);
      setSavedSlots([...savedSlots, { date, slots: slots.split(",").map(s => s.trim()) }]);
      setSlots("");
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Failed to save availability");
      console.error("Error saving availability:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const removeSlot = (index) => {
    setSavedSlots(savedSlots.filter((_, i) => i !== index));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 
            className="text-2xl font-semibold mb-2"
            style={{ color: "#194C63" }}
          >
            Manage Availability
          </h1>
          <p style={{ color: "#3C637B" }}>
            Set your available dates and time slots for consultations
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div 
            className="p-4 rounded-lg flex items-center gap-3"
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)"
            }}
          >
            <CheckCircle className="w-5 h-5" style={{ color: "#16a34a" }} />
            <span className="font-medium" style={{ color: "#16a34a" }}>
              Availability saved successfully!
            </span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Form */}
          <div>
            <div 
              className="p-6 rounded-xl mb-6"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D0DDEE",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
              }}
            >
              <h2 
                className="text-lg font-semibold mb-6 flex items-center gap-2"
                style={{ color: "#194C63" }}
              >
                <Calendar className="w-5 h-5" />
                Add New Availability
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                    Select Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5" style={{ color: "#AAB6CB" }} />
                    <input
                      type="date"
                      required
                      className="w-full pl-10 p-3 rounded focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "#F5FAFD",
                        border: "1px solid #AAB6CB",
                        color: "#0C0D14"
                      }}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                </div>

                {/* Time Slots Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                    Time Slots *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-5 h-5" style={{ color: "#AAB6CB" }} />
                    <input
                      placeholder="Enter times separated by commas (e.g., 10:00, 11:00, 14:00)"
                      required
                      className="w-full pl-10 p-3 rounded focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "#F5FAFD",
                        border: "1px solid #AAB6CB",
                        color: "#0C0D14"
                      }}
                      value={slots}
                      onChange={(e) => setSlots(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                  <p className="text-xs mt-2" style={{ color: "#748DB0" }}>
                    Separate multiple time slots with commas
                  </p>
                </div>

                {/* Example Slots */}
                <div 
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: "rgba(25, 76, 99, 0.05)",
                    border: "1px solid rgba(25, 76, 99, 0.1)"
                  }}
                >
                  <p className="text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                    Example formats:
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs" style={{ color: "#748DB0" }}>• 10:00, 11:00, 14:00</p>
                    <p className="text-xs" style={{ color: "#748DB0" }}>• 09:30, 13:45, 15:00, 16:30</p>
                    <p className="text-xs" style={{ color: "#748DB0" }}>• 08:00 AM, 12:30 PM, 03:00 PM</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || !date || !slots}
                  className="w-full py-3 rounded font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#194C63",
                    color: "#F5FAFD"
                  }}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Availability
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Add Suggestions */}
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D0DDEE"
              }}
            >
              <h3 
                className="font-semibold mb-4"
                style={{ color: "#194C63" }}
              >
                Quick Time Slots
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "09:00, 10:00, 11:00",
                  "13:00, 14:00, 15:00",
                  "10:00, 14:00, 16:00",
                  "08:30, 12:30, 15:30"
                ].map((timeSlot, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSlots(timeSlot)}
                    className="p-3 text-sm rounded-lg text-center transition-all hover:opacity-90"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #D0DDEE",
                      color: "#3C637B"
                    }}
                  >
                    {timeSlot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Saved Slots */}
          <div>
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D0DDEE",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 
                  className="text-lg font-semibold flex items-center gap-2"
                  style={{ color: "#194C63" }}
                >
                  <Clock className="w-5 h-5" />
                  Saved Availability
                </h2>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(25, 76, 99, 0.1)",
                    color: "#194C63"
                  }}
                >
                  {savedSlots.length} date{savedSlots.length !== 1 ? 's' : ''}
                </span>
              </div>

              {savedSlots.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                    <Calendar className="w-8 h-8" style={{ color: "#AAB6CB" }} />
                  </div>
                  <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                    No availability set
                  </h3>
                  <p style={{ color: "#3C637B" }}>
                    Add your available dates and time slots to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg group transition-all hover:shadow-sm"
                      style={{
                        backgroundColor: "#F5FAFD",
                        border: "1px solid #D0DDEE"
                      }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold mb-1" style={{ color: "#194C63" }}>
                            {formatDate(slot.date)}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {slot.slots.map((time, timeIndex) => (
                              <span
                                key={timeIndex}
                                className="px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                  backgroundColor: "rgba(60, 99, 123, 0.1)",
                                  color: "#3C637B"
                                }}
                              >
                                {time}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => removeSlot(index)}
                          className="p-2 rounded transition-all hover:opacity-80 opacity-0 group-hover:opacity-100"
                          style={{
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            color: "#ef4444"
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs flex items-center gap-2">
                        <span style={{ color: "#748DB0" }}>{slot.slots.length} slot{slot.slots.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bulk Actions */}
              {savedSlots.length > 0 && (
                <div className="mt-8 pt-6 border-t" style={{ borderColor: "#D0DDEE" }}>
                  <button
                    className="w-full py-3 rounded font-medium transition-all hover:opacity-90 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#3C637B"
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Add More Dates
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Availability;