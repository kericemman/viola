import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import { 
  Building2, 
  User, 
  Mail, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  FileText,
  MessageSquare,
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit3,
  Save,
  Tag,
  Target,
  CalendarRange,
  MoreVertical,
  Phone
} from "lucide-react";

const OrganizationInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedInquiry, setExpandedInquiry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/organization-inquiries");
      setInquiries(data);
      setFilteredInquiries(data);
    } catch (error) {
      console.error("Failed to load inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    filterInquiries();
  }, [searchTerm, statusFilter, dateFilter, inquiries]);

  const filterInquiries = () => {
    let result = inquiries;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(inquiry =>
        inquiry.organizationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.serviceTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(inquiry => inquiry.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();
      
      switch(dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          result = result.filter(inquiry => new Date(inquiry.createdAt) >= filterDate);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          result = result.filter(inquiry => new Date(inquiry.createdAt) >= filterDate);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          result = result.filter(inquiry => new Date(inquiry.createdAt) >= filterDate);
          break;
      }
    }

    setFilteredInquiries(result);
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/organization-inquiries/${id}`, { status });
      load();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const updateNote = async (id, adminNote) => {
    try {
      await api.patch(`/organization-inquiries/${id}`, { adminNote });
      setEditingNote(null);
      load();
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6", icon: <AlertCircle className="w-4 h-4" /> };
      case 'contacted':
        return { bg: "rgba(234, 179, 8, 0.1)", text: "#ca8a04", icon: <MessageSquare className="w-4 h-4" /> };
      case 'proposal_sent':
        return { bg: "rgba(168, 85, 247, 0.1)", text: "#a855f7", icon: <FileText className="w-4 h-4" /> };
      case 'closed':
        return { bg: "rgba(34, 197, 94, 0.1)", text: "#16a34a", icon: <CheckCircle className="w-4 h-4" /> };
      default:
        return { bg: "rgba(116, 141, 176, 0.1)", text: "#748DB0", icon: <Clock className="w-4 h-4" /> };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateStats = () => {
    return {
      total: inquiries.length,
      new: inquiries.filter(i => i.status === 'new').length,
      contacted: inquiries.filter(i => i.status === 'contacted').length,
      proposalSent: inquiries.filter(i => i.status === 'proposal_sent').length,
      closed: inquiries.filter(i => i.status === 'closed').length
    };
  };

  const stats = calculateStats();

  const exportInquiries = () => {
    const csv = [
      ['Organization', 'Contact Person', 'Email', 'Phone', 'Service', 'Status', 'Size', 'Timeline', 'Challenges', 'Goals', 'Date', 'Notes'],
      ...filteredInquiries.map(i => [
        i.organizationName,
        i.contactPerson,
        i.email,
        i.phone || 'N/A',
        i.serviceTitle,
        i.status,
        i.size || 'N/A',
        i.timeline || 'N/A',
        i.challenges.replace(/,/g, ';'),
        i.goals.replace(/,/g, ';'),
        new Date(i.createdAt).toLocaleDateString(),
        i.adminNote || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `organization-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
            Organization Inquiries
          </h1>
          <p className="mt-1" style={{ color: "#3C637B" }}>
            Manage and track organization service inquiries
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div 
            className="p-5 rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Total</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(25, 76, 99, 0.1)" }}>
                <Building2 className="w-6 h-6" style={{ color: "#194C63" }} />
              </div>
            </div>
          </div>

          <div 
            className="p-5 rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>New</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.new}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}>
                <AlertCircle className="w-6 h-6" style={{ color: "#3b82f6" }} />
              </div>
            </div>
          </div>

          <div 
            className="p-5 rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Contacted</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.contacted}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(234, 179, 8, 0.1)" }}>
                <MessageSquare className="w-6 h-6" style={{ color: "#ca8a04" }} />
              </div>
            </div>
          </div>

          <div 
            className="p-5 rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Proposal Sent</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.proposalSent}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(168, 85, 247, 0.1)" }}>
                <FileText className="w-6 h-6" style={{ color: "#a855f7" }} />
              </div>
            </div>
          </div>

          <div 
            className="p-5 rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Closed</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.closed}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
                <CheckCircle className="w-6 h-6" style={{ color: "#16a34a" }} />
              </div>
            </div>
          </div>
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
              <Search className="absolute left-3 top-3 w-4 h-4" style={{ color: "#AAB6CB" }} />
              <input
                type="text"
                placeholder="Search by organization, contact, email..."
                className="w-full pl-10 p-3 rounded focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: "#F5FAFD",
                  border: "1px solid #AAB6CB",
                  color: "#0C0D14"
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
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
                <option value="proposal_sent">Proposal Sent</option>
                <option value="closed">Closed</option>
              </select>

              <select
                className="px-4 py-2 rounded focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: "#F5FAFD",
                  border: "1px solid #AAB6CB",
                  color: "#3C637B"
                }}
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <button
                onClick={exportInquiries}
                className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2"
                style={{
                  backgroundColor: "#194C63",
                  color: "#F5FAFD"
                }}
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div 
          className="rounded-xl overflow-hidden"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          {/* Header */}
          <div 
            className="px-6 py-4 border-b"
            style={{ 
              backgroundColor: "#F5FAFD",
              borderColor: "#D0DDEE"
            }}
          >
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <span className="font-medium" style={{ color: "#194C63" }}>Organization & Service</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium" style={{ color: "#194C63" }}>Contact</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium" style={{ color: "#194C63" }}>Details</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium" style={{ color: "#194C63" }}>Status</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="font-medium" style={{ color: "#194C63" }}>Actions</span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="px-6 py-12 text-center">
              <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
              <p className="mt-3" style={{ color: "#3C637B" }}>Loading inquiries...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                <Building2 className="w-8 h-8" style={{ color: "#AAB6CB" }} />
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                No inquiries found
              </h3>
              <p style={{ color: "#3C637B" }}>
                {searchTerm ? "Try adjusting your search" : "Organization inquiries will appear here"}
              </p>
            </div>
          ) : (
            <div>
              {filteredInquiries.map((inquiry) => {
                const status = getStatusColor(inquiry.status);
                const isExpanded = expandedInquiry === inquiry._id;

                return (
                  <div key={inquiry._id}>
                    {/* Main Row */}
                    <div 
                      className="px-6 py-4 border-b hover:bg-gray-50 transition-colors cursor-pointer"
                      style={{ borderColor: "#F5FAFD" }}
                      onClick={() => setExpandedInquiry(isExpanded ? null : inquiry._id)}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Organization & Service */}
                        <div className="col-span-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: status.bg }}
                            >
                              <Building2 className="w-5 h-5" style={{ color: status.text }} />
                            </div>
                            <div>
                              <h3 className="font-semibold" style={{ color: "#0C0D14" }}>
                                {inquiry.organizationName}
                              </h3>
                              <p className="text-sm" style={{ color: "#748DB0" }}>
                                {inquiry.serviceTitle}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Contact */}
                        <div className="col-span-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" style={{ color: "#748DB0" }} />
                              <span className="text-sm" style={{ color: "#3C637B" }}>
                                {inquiry.contactPerson}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" style={{ color: "#748DB0" }} />
                              <span className="text-sm truncate" style={{ color: "#3C637B" }}>
                                {inquiry.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="col-span-2">
                          <div className="space-y-1">
                            {inquiry.size && (
                              <div className="flex items-center gap-1">
                                <Tag className="w-3 h-3" style={{ color: "#748DB0" }} />
                                <span className="text-sm" style={{ color: "#3C637B" }}>
                                  {inquiry.size}
                                </span>
                              </div>
                            )}
                            {inquiry.timeline && (
                              <div className="flex items-center gap-1">
                                <CalendarRange className="w-3 h-3" style={{ color: "#748DB0" }} />
                                <span className="text-sm" style={{ color: "#3C637B" }}>
                                  {inquiry.timeline}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                          <select
                            value={inquiry.status}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateStatus(inquiry._id, e.target.value);
                            }}
                            className="px-3 py-2 rounded text-sm font-medium focus:outline-none focus:ring-2 transition-all cursor-pointer"
                            style={{
                              backgroundColor: status.bg,
                              color: status.text,
                              border: `1px solid ${status.text}30`
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="proposal_sent">Proposal Sent</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>

                        {/* Actions */}
                        <div className="col-span-2">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedInquiry(isExpanded ? null : inquiry._id);
                              }}
                              className="p-2 rounded transition-all hover:opacity-80"
                              style={{
                                backgroundColor: "#F5FAFD",
                                color: "#3C637B"
                              }}
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div 
                        className="px-6 py-6 border-b"
                        style={{ 
                          backgroundColor: "#F5FAFD",
                          borderColor: "#D0DDEE"
                        }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Organization Details */}
                          <div className="space-y-4">
                            <h4 className="font-semibold" style={{ color: "#194C63" }}>Organization Details</h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Organization</p>
                                <p className="text-sm font-medium" style={{ color: "#0C0D14" }}>{inquiry.organizationName}</p>
                              </div>
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Size</p>
                                <p className="text-sm" style={{ color: "#0C0D14" }}>{inquiry.size || "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Timeline</p>
                                <p className="text-sm" style={{ color: "#0C0D14" }}>{inquiry.timeline || "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Service</p>
                                <p className="text-sm font-medium" style={{ color: "#0C0D14" }}>{inquiry.serviceTitle}</p>
                              </div>
                            </div>
                          </div>

                          {/* Contact Details */}
                          <div className="space-y-4">
                            <h4 className="font-semibold" style={{ color: "#194C63" }}>Contact Information</h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Contact Person</p>
                                <p className="text-sm font-medium" style={{ color: "#0C0D14" }}>{inquiry.contactPerson}</p>
                              </div>
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Email</p>
                                <p className="text-sm">
                                  <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                                    {inquiry.email}
                                  </a>
                                </p>
                              </div>
                              {inquiry.phone && (
                                <div>
                                  <p className="text-xs" style={{ color: "#748DB0" }}>Phone</p>
                                  <p className="text-sm">
                                    <a href={`tel:${inquiry.phone}`} className="text-blue-600 hover:underline">
                                      {inquiry.phone}
                                    </a>
                                  </p>
                                </div>
                              )}
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Submitted</p>
                                <p className="text-sm" style={{ color: "#0C0D14" }}>{formatDate(inquiry.createdAt)}</p>
                              </div>
                            </div>
                          </div>

                          {/* Challenges */}
                          <div>
                            <h4 className="font-semibold mb-2" style={{ color: "#194C63" }}>Current Challenges</h4>
                            <div 
                              className="p-4 rounded-lg"
                              style={{
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #D0DDEE"
                              }}
                            >
                              <p className="text-sm" style={{ color: "#3C637B" }}>{inquiry.challenges}</p>
                            </div>
                          </div>

                          {/* Goals */}
                          <div>
                            <h4 className="font-semibold mb-2" style={{ color: "#194C63" }}>Goals & Expectations</h4>
                            <div 
                              className="p-4 rounded-lg"
                              style={{
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #D0DDEE"
                              }}
                            >
                              <p className="text-sm" style={{ color: "#3C637B" }}>{inquiry.goals}</p>
                            </div>
                          </div>

                          {/* Admin Notes */}
                          <div className="md:col-span-2">
                            <h4 className="font-semibold mb-2" style={{ color: "#194C63" }}>Admin Notes</h4>
                            
                            {editingNote === inquiry._id ? (
                              <div className="space-y-3">
                                <textarea
                                  value={noteText}
                                  onChange={(e) => setNoteText(e.target.value)}
                                  placeholder="Add internal notes..."
                                  rows="4"
                                  className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    backgroundColor: "#FFFFFF",
                                    border: "1px solid #AAB6CB",
                                    color: "#0C0D14"
                                  }}
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => updateNote(inquiry._id, noteText)}
                                    className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2"
                                    style={{
                                      backgroundColor: "#194C63",
                                      color: "#F5FAFD"
                                    }}
                                  >
                                    <Save className="w-4 h-4" />
                                    Save Note
                                  </button>
                                  <button
                                    onClick={() => setEditingNote(null)}
                                    className="px-4 py-2 rounded font-medium transition-all hover:opacity-90"
                                    style={{
                                      backgroundColor: "#F5FAFD",
                                      border: "1px solid #AAB6CB",
                                      color: "#3C637B"
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div 
                                className="p-4 rounded-lg"
                                style={{
                                  backgroundColor: "#FFFFFF",
                                  border: "1px solid #D0DDEE"
                                }}
                              >
                                {inquiry.adminNote ? (
                                  <p style={{ color: "#3C637B" }}>{inquiry.adminNote}</p>
                                ) : (
                                  <p className="italic" style={{ color: "#AAB6CB" }}>No notes added yet.</p>
                                )}
                                <button
                                  onClick={() => {
                                    setEditingNote(inquiry._id);
                                    setNoteText(inquiry.adminNote || "");
                                  }}
                                  className="mt-3 px-3 py-1 rounded text-sm transition-all hover:opacity-80 flex items-center gap-2"
                                  style={{
                                    backgroundColor: "#F5FAFD",
                                    border: "1px solid #AAB6CB",
                                    color: "#3C637B"
                                  }}
                                >
                                  <Edit3 className="w-3 h-3" />
                                  {inquiry.adminNote ? "Edit Note" : "Add Note"}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Summary */}
        {filteredInquiries.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm" style={{ color: "#748DB0" }}>
              Showing {filteredInquiries.length} of {inquiries.length} inquiries
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" style={{ color: "#748DB0" }} />
                <span className="text-sm" style={{ color: "#3C637B" }}>
                  New: <strong style={{ color: "#194C63" }}>{stats.new}</strong> | 
                  Contacted: <strong style={{ color: "#194C63" }}>{stats.contacted}</strong> | 
                  Closed: <strong style={{ color: "#194C63" }}>{stats.closed}</strong>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default OrganizationInquiries;