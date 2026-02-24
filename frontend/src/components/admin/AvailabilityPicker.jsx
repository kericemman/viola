import { useEffect, useState } from "react";
import api from "../../services/api";
import { Calendar, Clock, CheckCircle, ChevronRight, Users } from "lucide-react";

const AvailabilityPicker = ({ onSelect }) => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const res = await api.get("/availability");
      setAvailability(res.data);
      
      // Auto-select first available date if exists
      if (res.data.length > 0) {
        setSelectedDate(res.data[0].date);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSlotSelect = (date, time) => {
    setSelectedDate(date);
    setSelectedSlot(time);
    if (onSelect) {
      onSelect(date, time);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let dayLabel = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    if (date.toDateString() === today.toDateString()) {
      dayLabel = "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      dayLabel = "Tomorrow";
    }

    return {
      weekday: dayLabel,
      fullDate: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      isToday: date.toDateString() === today.toDateString()
    };
  };

  const getAvailableSlots = (date) => {
    const day = availability.find(day => day.date === date);
    return day ? day.slots.filter(s => !s.isBooked) : [];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 
          className="text-xl font-semibold flex items-center gap-2"
          style={{ color: "#194C63" }}
        >
          <Calendar className="w-5 h-5" />
          Select Available Time
        </h3>
        <span className="text-sm" style={{ color: "#748DB0" }}>
          {availability.length} date{availability.length !== 1 ? 's' : ''} available
        </span>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
          <p className="mt-3" style={{ color: "#3C637B" }}>Loading available times...</p>
        </div>
      ) : availability.length === 0 ? (
        <div 
          className="text-center py-12 rounded-xl"
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px dashed #D0DDEE"
          }}
        >
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
            <Calendar className="w-8 h-8" style={{ color: "#AAB6CB" }} />
          </div>
          <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
            No availability set
          </h3>
          <p style={{ color: "#3C637B" }}>
            Please check back later for available time slots
          </p>
        </div>
      ) : (
        <>
          {/* Date Selector */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4" style={{ color: "#748DB0" }} />
              <span className="text-sm font-medium" style={{ color: "#194C63" }}>
                Select a date:
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {availability.map((day) => {
                const formattedDate = formatDate(day.date);
                const isSelected = selectedDate === day.date;
                const availableSlots = getAvailableSlots(day.date);
                
                return (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    className={`flex-shrink-0 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isSelected ? 'border-2' : 'border'
                    }`}
                    style={{
                      backgroundColor: isSelected ? "#194C63" : "#FFFFFF",
                      borderColor: isSelected ? "#194C63" : "#D0DDEE",
                      borderWidth: isSelected ? "2px" : "1px",
                      color: isSelected ? "#F5FAFD" : "#194C63"
                    }}
                  >
                    <div className="text-center">
                      <div className="text-xs opacity-80 mb-1">
                        {formattedDate.weekday}
                      </div>
                      <div className="font-semibold text-sm">
                        {new Date(day.date).getDate()}
                      </div>
                      <div className="text-xs mt-1">
                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      {formattedDate.isToday && (
                        <div 
                          className="text-xs mt-1 px-2 py-0.5 rounded-full inline-block"
                          style={{
                            backgroundColor: "rgba(34, 197, 94, 0.1)",
                            color: "#16a34a"
                          }}
                        >
                          Today
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots for Selected Date */}
          {selectedDate && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 
                    className="font-semibold text-lg flex items-center gap-2"
                    style={{ color: "#194C63" }}
                  >
                    {formatDate(selectedDate).weekday}
                    <span className="text-sm font-normal" style={{ color: "#748DB0" }}>
                      {formatDate(selectedDate).fullDate}
                    </span>
                  </h4>
                </div>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(25, 76, 99, 0.1)",
                    color: "#194C63"
                  }}
                >
                  {getAvailableSlots(selectedDate).length} slot{getAvailableSlots(selectedDate).length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {getAvailableSlots(selectedDate).map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  
                  return (
                    <button
                      key={slot.time}
                      onClick={() => handleSlotSelect(selectedDate, slot.time)}
                      className={`group p-4 rounded-xl transition-all duration-200 relative overflow-hidden ${
                        isSelected ? 'ring-2 ring-offset-2' : 'hover:shadow-md'
                      }`}
                      style={{
                        backgroundColor: isSelected ? "#194C63" : "#F5FAFD",
                        border: isSelected ? "none" : "1px solid #D0DDEE",
                        color: isSelected ? "#F5FAFD" : "#194C63",
                        ringColor: "#194C63",
                        ringOffsetColor: "#F5FAFD"
                      }}
                    >
                      {isSelected && (
                        <div 
                          className="absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#FFFFFF" }}
                        >
                          <CheckCircle className="w-4 h-4" style={{ color: "#194C63" }} />
                        </div>
                      )}
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-1">
                          {slot.time}
                        </div>
                        <div className="text-xs opacity-80">
                          {parseInt(slot.time.split(':')[0]) >= 12 ? 'PM' : 'AM'}
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div 
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out opacity-10"
                        style={{ 
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* No Slots Available */}
              {getAvailableSlots(selectedDate).length === 0 && (
                <div 
                  className="p-8 rounded-xl text-center"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "2px dashed #D0DDEE"
                  }}
                >
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                    <Users className="w-8 h-8" style={{ color: "#AAB6CB" }} />
                  </div>
                  <h4 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                    No available slots for this date
                  </h4>
                  <p style={{ color: "#3C637B" }}>
                    Please select another date or check back later
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Selected Time Display */}
          {selectedSlot && (
            <div 
              className="mt-8 p-4 rounded-xl"
              style={{
                backgroundColor: "rgba(25, 76, 99, 0.05)",
                border: "1px solid rgba(25, 76, 99, 0.1)"
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: "#194C63" }}>
                    Selected Appointment
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: "#748DB0" }} />
                      <span style={{ color: "#0C0D14" }}>{formatDate(selectedDate).fullDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: "#748DB0" }} />
                      <span className="font-semibold" style={{ color: "#0C0D14" }}>{selectedSlot}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5" style={{ color: "#194C63" }} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AvailabilityPicker;