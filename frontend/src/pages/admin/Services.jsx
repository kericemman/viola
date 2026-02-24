import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import { 
  Mail, 
  Calendar, 
  User, 
  Target, 
  Flag, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  Filter,
  Download,
  Eye,
  ChevronRight,
  Phone
} from "lucide-react";

const ServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get("/service-requests");
      setRequests(res.data);
    } catch (error) {
      console.error("Failed to fetch service requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/service-requests/${id}`, { status });
      fetchRequests();
      if (selectedRequest?._id === id) {
        setSelectedRequest({ ...selectedRequest, status });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'new':
        return { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6", icon: <Clock className="w-4 h-4" /> };
      case 'contacted':
        return { bg: "rgba(234, 179, 8, 0.1)", text: "#ca8a04", icon: <MessageSquare className="w-4 h-4" /> };
      case 'in_progress':
        return { bg: "rgba(168, 85, 247, 0.1)", text: "#a855f7", icon: <Flag className="w-4 h-4" /> };
      case 'completed':
        return { bg: "rgba(34, 197, 94, 0.1)", text: "#16a34a", icon: <CheckCircle className="w-4 h-4" /> };
      case 'cancelled':
        return { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444", icon: <XCircle className="w-4 h-4" /> };
      default:
        return { bg: "rgba(116, 141, 176, 0.1)", text: "#748DB0", icon: <Clock className="w-4 h-4" /> };
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.serviceTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: requests.length,
    new: requests.filter(r => r.status === "new").length,
    contacted: requests.filter(r => r.status === "contacted").length,
    completed: requests.filter(r => r.status === "completed").length
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
            Service Requests
          </h1>
          <p className="mt-1" style={{ color: "#3C637B" }}>
            Manage client inquiries and service requests
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Requests", value: stats.total, color: "#194C63", icon: <Target className="w-5 h-5" /> },
            { label: "New", value: stats.new, color: "#3b82f6", icon: <Clock className="w-5 h-5" /> },
            { label: "Contacted", value: stats.contacted, color: "#ca8a04", icon: <MessageSquare className="w-5 h-5" /> },
            { label: "Completed", value: stats.completed, color: "#16a34a", icon: <CheckCircle className="w-5 h-5" /> },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-5 rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D0DDEE"
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "#748DB0" }}>
                    {stat.label}
                  </p>
                  <p 
                    className="text-2xl font-bold mt-2"
                    style={{ color: "#0C0D14" }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <div style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div 
          className="p-5 rounded-xl"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by name, email, or service..."
                className="w-full pl-10 p-3 rounded focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: "#F5FAFD",
                  border: "1px solid #AAB6CB",
                  color: "#0C0D14"
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Filter className="absolute left-3 top-3 w-4 h-4" style={{ color: "#AAB6CB" }} />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-4">
              <select
                className="px-4 py-2 rounded focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: "#F5FAFD",
                  border: "1px solid #AAB6CB",
                  color: "#3C637B"
                }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button
                className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2"
                style={{
                  backgroundColor: "#F5FAFD",
                  border: "1px solid #AAB6CB",
                  color: "#3C637B"
                }}
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Requests List */}
          <div className="lg:col-span-2">
            <div 
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D0DDEE"
              }}
            >
              {/* Table Header */}
              <div 
                className="px-6 py-4 border-b"
                style={{ 
                  backgroundColor: "#F5FAFD",
                  borderColor: "#D0DDEE"
                }}
              >
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-5">
                    <span className="font-medium" style={{ color: "#194C63" }}>
                      Client & Service
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span className="font-medium" style={{ color: "#194C63" }}>
                      Date
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium" style={{ color: "#194C63" }}>
                      Status
                    </span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-medium" style={{ color: "#194C63" }}>
                      Actions
                    </span>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="px-6 py-12 text-center">
                  <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
                  <p className="mt-3" style={{ color: "#3C637B" }}>Loading requests...</p>
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                    <MessageSquare className="w-8 h-8" style={{ color: "#AAB6CB" }} />
                  </div>
                  <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                    No service requests found
                  </h3>
                  <p className="mb-4" style={{ color: "#3C637B" }}>
                    {searchTerm || statusFilter !== 'all' 
                      ? "Try adjusting your search or filter criteria" 
                      : "Service requests will appear here when clients submit inquiries"}
                  </p>
                </div>
              ) : (
                /* Requests List */
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredRequests.map((request) => {
                    const status = getStatusColor(request.status);
                    const isSelected = selectedRequest?._id === request._id;
                    
                    return (
                      <div
                        key={request._id}
                        className={`px-6 py-4 border-b transition-colors cursor-pointer ${
                          isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                        style={{ borderColor: "#F5FAFD" }}
                        onClick={() => setSelectedRequest(request)}
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
                          {/* Client & Service */}
                          <div className="col-span-5">
                            <div className="flex items-start gap-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${status.text}15` }}
                              >
                                <User className="w-5 h-5" style={{ color: status.text }} />
                              </div>
                              <div>
                                <h3 
                                  className="font-semibold"
                                  style={{ color: "#0C0D14" }}
                                >
                                  {request.name}
                                </h3>
                                <p 
                                  className="text-sm line-clamp-1 mt-1"
                                  style={{ color: "#3C637B" }}
                                >
                                  {request.serviceTitle}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Mail className="w-3 h-3" style={{ color: "#AAB6CB" }} />
                                  <span 
                                    className="text-sm truncate"
                                    style={{ color: "#748DB0" }}
                                  >
                                    {request.email}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Date */}
                          <div className="col-span-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" style={{ color: "#748DB0" }} />
                              <div>
                                <p className="text-sm" style={{ color: "#0C0D14" }}>
                                  {formatDate(request.createdAt).split(',')[0]}
                                </p>
                                <p className="text-xs" style={{ color: "#AAB6CB" }}>
                                  {formatDate(request.createdAt).split(',')[1]}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              {status.icon}
                              <span 
                                className="text-sm px-2 py-1 rounded-full font-medium"
                                style={{
                                  backgroundColor: status.bg,
                                  color: status.text
                                }}
                              >
                                {request.status || "New"}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="col-span-2">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                className="p-2 rounded transition-all hover:opacity-80"
                                style={{
                                  backgroundColor: "rgba(25, 76, 99, 0.1)",
                                  color: "#194C63"
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRequest(request);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <ChevronRight 
                                className={`w-4 h-4 transition-transform ${
                                  isSelected ? 'rotate-90' : ''
                                }`}
                                style={{ color: "#748DB0" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Request Details */}
          <div className="lg:col-span-1">
            {selectedRequest ? (
              <div 
                className="rounded-xl overflow-hidden sticky top-6"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0DDEE",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
                }}
              >
                {/* Header */}
                <div 
                  className="p-6 border-b"
                  style={{ 
                    backgroundColor: "#F5FAFD",
                    borderColor: "#D0DDEE"
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 
                      className="text-lg font-semibold"
                      style={{ color: "#194C63" }}
                    >
                      Request Details
                    </h2>
                    <span className="text-sm" style={{ color: "#748DB0" }}>
                      #{selectedRequest._id.slice(-8)}
                    </span>
                  </div>

                  {/* Status Actions */}
                  <div className="flex flex-wrap gap-2">
                    {['new', 'contacted', 'in_progress', 'completed', 'cancelled'].map((status) => {
                      const statusConfig = getStatusColor(status);
                      const isCurrent = selectedRequest.status === status;
                      
                      return (
                        <button
                          key={status}
                          onClick={() => updateStatus(selectedRequest._id, status)}
                          className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                            isCurrent ? '' : 'hover:opacity-90'
                          }`}
                          style={{
                            backgroundColor: isCurrent ? statusConfig.text : statusConfig.bg,
                            color: isCurrent ? "#FFFFFF" : statusConfig.text,
                            border: isCurrent ? "none" : `1px solid ${statusConfig.text}30`
                          }}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Client Info */}
                <div className="p-6 border-b" style={{ borderColor: "#F5FAFD" }}>
                  <h3 
                    className="font-semibold mb-4 flex items-center gap-2"
                    style={{ color: "#194C63" }}
                  >
                    <User className="w-5 h-5" />
                    Client Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Full Name</p>
                      <p style={{ color: "#0C0D14" }}>{selectedRequest.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Email</p>
                      <a 
                        href={`mailto:${selectedRequest.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedRequest.email}
                      </a>
                    </div>
                    
                    {selectedRequest.phone && (
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Phone</p>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" style={{ color: "#748DB0" }} />
                          <a 
                            href={`tel:${selectedRequest.phone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {selectedRequest.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Service Requested</p>
                      <p 
                        className="font-medium mt-1 px-3 py-1 rounded-full inline-block"
                        style={{
                          backgroundColor: "rgba(25, 76, 99, 0.1)",
                          color: "#194C63"
                        }}
                      >
                        {selectedRequest.serviceTitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Request Details */}
                <div className="p-6 border-b" style={{ borderColor: "#F5FAFD" }}>
                  <h3 
                    className="font-semibold mb-4 flex items-center gap-2"
                    style={{ color: "#194C63" }}
                  >
                    <Target className="w-5 h-5" />
                    Request Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2" style={{ color: "#748DB0" }}>
                        Current Challenges
                      </p>
                      <p 
                        className="text-sm p-3 rounded-lg"
                        style={{
                          backgroundColor: "#F5FAFD",
                          color: "#3C637B",
                          borderLeft: "3px solid #B3785A"
                        }}
                      >
                        {selectedRequest.challenges}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2" style={{ color: "#748DB0" }}>
                        Goals & Expectations
                      </p>
                      <p 
                        className="text-sm p-3 rounded-lg"
                        style={{
                          backgroundColor: "#F5FAFD",
                          color: "#3C637B",
                          borderLeft: "3px solid #194C63"
                        }}
                      >
                        {selectedRequest.goals}
                      </p>
                    </div>
                    
                    {selectedRequest.additionalInfo && (
                      <div>
                        <p className="text-sm font-medium mb-2" style={{ color: "#748DB0" }}>
                          Additional Information
                        </p>
                        <p 
                          className="text-sm p-3 rounded-lg"
                          style={{
                            backgroundColor: "#F5FAFD",
                            color: "#3C637B"
                          }}
                        >
                          {selectedRequest.additionalInfo}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timestamp */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm" style={{ color: "#748DB0" }}>
                    <Calendar className="w-4 h-4" />
                    Submitted on {formatDate(selectedRequest.createdAt)}
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className="p-8 rounded-xl text-center"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "2px dashed #D0DDEE"
                }}
              >
                <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                  <Eye className="w-8 h-8" style={{ color: "#AAB6CB" }} />
                </div>
                <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                  Select a Request
                </h3>
                <p style={{ color: "#3C637B" }}>
                  Click on a service request to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ServiceRequests;