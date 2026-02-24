import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import { 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  MessageSquare, 
  Target,
  CheckCircle,
  XCircle,
  Archive,
  Reply,
  Filter,
  Search,
  Eye,
  ChevronRight,
  Download
} from "lucide-react";

const Bookings = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isArchiveMode, setIsArchiveMode] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get("/contact");
      setMessages(res.data);
    } catch (error) {
      console.error("Failed to fetch contact messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status });
      fetchMessages();
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (error) {
      console.error("Failed to update message status:", error);
    }
  };

  const archiveMessage = async (id) => {
    try {
      await api.put(`/contact/${id}/archive`);
      fetchMessages();
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Failed to archive message:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'unread':
        return { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6", icon: <MessageSquare className="w-4 h-4" /> };
      case 'read':
        return { bg: "rgba(116, 141, 176, 0.1)", text: "#748DB0", icon: <Eye className="w-4 h-4" /> };
      case 'replied':
        return { bg: "rgba(34, 197, 94, 0.1)", text: "#16a34a", icon: <Reply className="w-4 h-4" /> };
      case 'archived':
        return { bg: "rgba(168, 85, 247, 0.1)", text: "#a855f7", icon: <Archive className="w-4 h-4" /> };
      default:
        return { bg: "rgba(116, 141, 176, 0.1)", text: "#748DB0", icon: <MessageSquare className="w-4 h-4" /> };
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.service?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    const matchesArchive = isArchiveMode ? message.status === 'archived' : message.status !== 'archived';
    
    return matchesSearch && matchesStatus && matchesArchive;
  });

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === 'unread').length,
    replied: messages.filter(m => m.status === 'replied').length,
    archived: messages.filter(m => m.status === 'archived').length
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

  const exportMessages = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Service', 'Message', 'Status', 'Date'],
      ...filteredMessages.map(m => [
        m.name,
        m.email,
        m.phone || 'N/A',
        m.service || 'General Inquiry',
        m.message.substring(0, 100) + '...',
        m.status || 'unread',
        new Date(m.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-messages-${new Date().toISOString().split('T')[0]}.csv`;
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
            Contact Messages
          </h1>
          <p className="mt-1" style={{ color: "#3C637B" }}>
            Manage and respond to client inquiries
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Messages", value: stats.total, color: "#194C63", icon: <MessageSquare className="w-5 h-5" /> },
            { label: "Unread", value: stats.unread, color: "#3b82f6", icon: <Mail className="w-5 h-5" /> },
            { label: "Replied", value: stats.replied, color: "#16a34a", icon: <Reply className="w-5 h-5" /> },
            { label: "Archived", value: stats.archived, color: "#a855f7", icon: <Archive className="w-5 h-5" /> },
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

        {/* Filters & Actions */}
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
                placeholder="Search messages..."
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

            {/* Filters and Actions */}
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
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>

              <button
                onClick={() => setIsArchiveMode(!isArchiveMode)}
                className={`px-4 py-2 rounded font-medium transition-all flex items-center gap-2 ${
                  isArchiveMode ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isArchiveMode ? "#a855f7" : "#F5FAFD",
                  border: "1px solid #AAB6CB",
                  color: isArchiveMode ? "#FFFFFF" : "#3C637B"
                }}
              >
                <Archive className="w-4 h-4" />
                {isArchiveMode ? "Viewing Archived" : "View Archive"}
              </button>

              <button
                onClick={exportMessages}
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Messages List */}
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
                  <div className="col-span-4">
                    <span className="font-medium flex items-center gap-2" style={{ color: "#194C63" }}>
                      <User className="w-4 h-4" />
                      Contact
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span className="font-medium" style={{ color: "#194C63" }}>
                      Service
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium" style={{ color: "#194C63" }}>
                      Date
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium" style={{ color: "#194C63" }}>
                      Status
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <span className="font-medium" style={{ color: "#194C63" }}>
                      View
                    </span>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="px-6 py-12 text-center">
                  <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
                  <p className="mt-3" style={{ color: "#3C637B" }}>Loading messages...</p>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                    <Mail className="w-8 h-8" style={{ color: "#AAB6CB" }} />
                  </div>
                  <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                    No messages found
                  </h3>
                  <p className="mb-4" style={{ color: "#3C637B" }}>
                    {searchTerm || statusFilter !== 'all' 
                      ? "Try adjusting your search or filter criteria" 
                      : "Contact messages will appear here"}
                  </p>
                </div>
              ) : (
                /* Messages List */
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredMessages.map((message) => {
                    const status = getStatusColor(message.status);
                    const isSelected = selectedMessage?._id === message._id;
                    const isUnread = message.status === 'unread';
                    
                    return (
                      <div
                        key={message._id}
                        className={`px-6 py-4 border-b transition-colors cursor-pointer ${
                          isSelected ? 'bg-blue-50' : isUnread ? 'bg-blue-50/30' : 'hover:bg-gray-50'
                        }`}
                        style={{ borderColor: "#F5FAFD" }}
                        onClick={() => {
                          setSelectedMessage(message);
                          if (isUnread) {
                            updateMessageStatus(message._id, 'read');
                          }
                        }}
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
                          {/* Contact Info */}
                          <div className="col-span-4">
                            <div className="flex items-start gap-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${status.text}15` }}
                              >
                                <User className="w-5 h-5" style={{ color: status.text }} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 
                                    className={`font-semibold ${isUnread ? 'font-bold' : ''}`}
                                    style={{ color: "#0C0D14" }}
                                  >
                                    {message.name}
                                  </h3>
                                  {isUnread && (
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Mail className="w-3 h-3" style={{ color: "#AAB6CB" }} />
                                  <span 
                                    className="text-sm truncate"
                                    style={{ color: "#748DB0" }}
                                  >
                                    {message.email}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Service */}
                          <div className="col-span-3">
                            {message.service ? (
                              <div className="flex items-center gap-2">
                                <Target className="w-4 h-4" style={{ color: "#748DB0" }} />
                                <span 
                                  className="text-sm truncate"
                                  style={{ color: "#3C637B" }}
                                >
                                  {message.service}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm italic" style={{ color: "#AAB6CB" }}>General Inquiry</span>
                            )}
                          </div>

                          {/* Date */}
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" style={{ color: "#748DB0" }} />
                              <div>
                                <p className="text-xs" style={{ color: "#0C0D14" }}>
                                  {formatDate(message.createdAt).split(',')[0]}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              {status.icon}
                              <span 
                                className="text-xs px-2 py-1 rounded-full font-medium"
                                style={{
                                  backgroundColor: status.bg,
                                  color: status.text
                                }}
                              >
                                {message.status || "unread"}
                              </span>
                            </div>
                          </div>

                          {/* View Button */}
                          <div className="col-span-1">
                            <div className="flex items-center justify-end">
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

          {/* Right Column: Message Details */}
          <div className="lg:col-span-1">
            {selectedMessage ? (
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
                      Message Details
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800">
                        #{selectedMessage._id.slice(-6)}
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateMessageStatus(selectedMessage._id, 'replied')}
                      className="px-3 py-1.5 rounded text-xs font-medium transition-all hover:opacity-90 flex items-center gap-1"
                      style={{
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        color: "#16a34a",
                        border: "1px solid rgba(34, 197, 94, 0.3)"
                      }}
                    >
                      <Reply className="w-3 h-3" />
                      Mark as Replied
                    </button>
                    
                    <button
                      onClick={() => archiveMessage(selectedMessage._id)}
                      className="px-3 py-1.5 rounded text-xs font-medium transition-all hover:opacity-90 flex items-center gap-1"
                      style={{
                        backgroundColor: "rgba(168, 85, 247, 0.1)",
                        color: "#a855f7",
                        border: "1px solid rgba(168, 85, 247, 0.3)"
                      }}
                    >
                      <Archive className="w-3 h-3" />
                      Archive
                    </button>
                  </div>
                </div>

                {/* Sender Info */}
                <div className="p-6 border-b" style={{ borderColor: "#F5FAFD" }}>
                  <h3 
                    className="font-semibold mb-4 flex items-center gap-2"
                    style={{ color: "#194C63" }}
                  >
                    <User className="w-5 h-5" />
                    Sender Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Name</p>
                      <p style={{ color: "#0C0D14" }}>{selectedMessage.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Email</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4" style={{ color: "#748DB0" }} />
                        <a 
                          href={`mailto:${selectedMessage.email}`}
                          className="text-blue-600 hover:underline break-all"
                        >
                          {selectedMessage.email}
                        </a>
                      </div>
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: Your Inquiry&body=Dear ${selectedMessage.name.split(' ')[0]},%0D%0A%0D%0AThank you for your message...`}
                        className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:underline"
                      >
                        <Reply className="w-3 h-3" />
                        Reply via Email
                      </a>
                    </div>
                    
                    {selectedMessage.phone && (
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Phone</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="w-4 h-4" style={{ color: "#748DB0" }} />
                          <a 
                            href={`tel:${selectedMessage.phone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {selectedMessage.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {selectedMessage.service && (
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Service Interest</p>
                        <p 
                          className="mt-1 px-3 py-1 rounded-full inline-block font-medium"
                          style={{
                            backgroundColor: "rgba(179, 120, 90, 0.1)",
                            color: "#B3785A"
                          }}
                        >
                          {selectedMessage.service}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Content */}
                <div className="p-6">
                  <h3 
                    className="font-semibold mb-4 flex items-center gap-2"
                    style={{ color: "#194C63" }}
                  >
                    <MessageSquare className="w-5 h-5" />
                    Message Content
                  </h3>
                  
                  <div 
                    className="p-4 rounded-lg whitespace-pre-wrap"
                    style={{
                      backgroundColor: "#F5FAFD",
                      color: "#3C637B",
                      borderLeft: "3px solid #194C63",
                      maxHeight: "300px",
                      overflowY: "auto"
                    }}
                  >
                    {selectedMessage.message}
                  </div>
                  
                  {/* Timestamp */}
                  <div className="mt-6 pt-6 border-t flex items-center gap-2 text-sm" style={{ borderColor: "#F5FAFD", color: "#748DB0" }}>
                    <Calendar className="w-4 h-4" />
                    Received on {formatDate(selectedMessage.createdAt)}
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
                  <MessageSquare className="w-8 h-8" style={{ color: "#AAB6CB" }} />
                </div>
                <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                  Select a Message
                </h3>
                <p style={{ color: "#3C637B" }}>
                  Click on a contact message to view details and reply
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Bookings;