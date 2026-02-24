import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import { 
  Package, 
  User, 
  Mail, 
  DollarSign, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Edit3,
  Save,
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  Eye,
  MoreVertical,
  CreditCard,
  FileText,
  MessageSquare,
  Receipt,
  Trash2
} from "lucide-react";

const IndividualOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/individual-orders");
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter, dateFilter, orders]);

  const filterOrders = () => {
    let result = orders;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(order =>
        order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.serviceTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(order => order.paymentStatus === statusFilter);
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();
      
      switch(dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          result = result.filter(order => new Date(order.createdAt) >= filterDate);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          result = result.filter(order => new Date(order.createdAt) >= filterDate);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          result = result.filter(order => new Date(order.createdAt) >= filterDate);
          break;
      }
    }

    setFilteredOrders(result);
  };

  const updateStatus = async (id, paymentStatus) => {
    try {
      await api.patch(`/individual-orders/${id}`, {
        paymentStatus
      });
      loadOrders();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await api.delete(`/individual-orders/${id}`);
      // Close any expanded order and hide confirmation
      if (expandedOrder === id) {
        setExpandedOrder(null);
      }
      setShowDeleteConfirm(null);
      loadOrders();
    } catch (error) {
      console.error("Failed to delete order:", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  const updateNote = async (id, adminNote) => {
    try {
      await api.patch(`/individual-orders/${id}`, {
        adminNote
      });
      setEditingNote(null);
      loadOrders();
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return { bg: "rgba(34, 197, 94, 0.1)", text: "#16a34a", icon: <CheckCircle className="w-4 h-4" /> };
      case 'completed':
        return { bg: "rgba(34, 197, 94, 0.1)", text: "#16a34a", icon: <CheckCircle className="w-4 h-4" /> };
      case 'pending':
        return { bg: "rgba(234, 179, 8, 0.1)", text: "#ca8a04", icon: <Clock className="w-4 h-4" /> };
      case 'pay_later':
        return { bg: "rgba(168, 85, 247, 0.1)", text: "#a855f7", icon: <CreditCard className="w-4 h-4" /> };
      case 'cancelled':
        return { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444", icon: <XCircle className="w-4 h-4" /> };
      default:
        return { bg: "rgba(116, 141, 176, 0.1)", text: "#748DB0", icon: <AlertCircle className="w-4 h-4" /> };
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

  const calculateTotals = () => {
    return {
      total: orders.length,
      paid: orders.filter(o => o.paymentStatus === 'paid' || o.paymentStatus === 'completed').length,
      pending: orders.filter(o => o.paymentStatus === 'pending').length,
      payLater: orders.filter(o => o.paymentStatus === 'pay_later').length,
      cancelled: orders.filter(o => o.paymentStatus === 'cancelled').length,
      revenue: orders
        .filter(o => o.paymentStatus === 'paid' || o.paymentStatus === 'completed')
        .reduce((sum, o) => sum + (o.amount || 0), 0)
    };
  };

  const stats = calculateTotals();

  const exportOrders = () => {
    const csv = [
      ['Order ID', 'Service', 'Customer', 'Email', 'Amount', 'Status', 'Date', 'Notes'],
      ...filteredOrders.map(o => [
        o._id,
        o.serviceTitle,
        o.name,
        o.email,
        o.amount || 'N/A',
        o.paymentStatus,
        new Date(o.createdAt).toLocaleDateString(),
        o.adminNote || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `individual-orders-${new Date().toISOString().split('T')[0]}.csv`;
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
            Individual Orders
          </h1>
          <p className="mt-1" style={{ color: "#3C637B" }}>
            Manage individual service orders and payments
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
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Total Orders</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(25, 76, 99, 0.1)" }}>
                <Package className="w-6 h-6" style={{ color: "#194C63" }} />
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
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Paid</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.paid}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
                <CheckCircle className="w-6 h-6" style={{ color: "#16a34a" }} />
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
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Pending</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.pending}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(234, 179, 8, 0.1)" }}>
                <Clock className="w-6 h-6" style={{ color: "#ca8a04" }} />
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
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Pay Later</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.payLater}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(168, 85, 247, 0.1)" }}>
                <CreditCard className="w-6 h-6" style={{ color: "#a855f7" }} />
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
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Revenue</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>KES {stats.revenue}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(179, 120, 90, 0.1)" }}>
                <DollarSign className="w-6 h-6" style={{ color: "#B3785A" }} />
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
                placeholder="Search by name, email, service..."
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
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="pay_later">Pay Later</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
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
                onClick={exportOrders}
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

        {/* Orders List */}
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
              <div className="col-span-3">
                <span className="font-medium" style={{ color: "#194C63" }}>Customer & Service</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium" style={{ color: "#194C63" }}>Amount</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium" style={{ color: "#194C63" }}>Date</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium" style={{ color: "#194C63" }}>Status</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium" style={{ color: "#194C63" }}>Notes</span>
              </div>
              <div className="col-span-1 text-right">
                <span className="font-medium" style={{ color: "#194C63" }}>Actions</span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="px-6 py-12 text-center">
              <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
              <p className="mt-3" style={{ color: "#3C637B" }}>Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                <Package className="w-8 h-8" style={{ color: "#AAB6CB" }} />
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                No orders found
              </h3>
              <p style={{ color: "#3C637B" }}>
                {searchTerm ? "Try adjusting your search" : "Individual orders will appear here"}
              </p>
            </div>
          ) : (
            <div>
              {filteredOrders.map((order) => {
                const status = getStatusColor(order.paymentStatus);
                const isExpanded = expandedOrder === order._id;
                const showConfirm = showDeleteConfirm === order._id;

                return (
                  <div key={order._id}>
                    {/* Main Order Row */}
                    <div 
                      className="px-6 py-4 border-b hover:bg-gray-50 transition-colors cursor-pointer"
                      style={{ borderColor: "#F5FAFD" }}
                      onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Customer & Service */}
                        <div className="col-span-3">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: status.bg }}
                            >
                              <User className="w-5 h-5" style={{ color: status.text }} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold" style={{ color: "#0C0D14" }}>
                                  {order.name}
                                </h3>
                                {order.paymentStatus === 'pay_later' && (
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                                    Pay Later
                                  </span>
                                )}
                              </div>
                              <p className="text-sm" style={{ color: "#748DB0" }}>
                                {order.serviceTitle}
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <Mail className="w-3 h-3" style={{ color: "#AAB6CB" }} />
                                <span className="text-xs" style={{ color: "#748DB0" }}>
                                  {order.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" style={{ color: "#748DB0" }} />
                            <span className="font-semibold" style={{ color: "#194C63" }}>
                              KES {order.amount || '0'}
                            </span>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" style={{ color: "#748DB0" }} />
                            <span className="text-sm" style={{ color: "#3C637B" }}>
                              {formatDate(order.createdAt).split(',')[0]}
                            </span>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                          <select
                            value={order.paymentStatus}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateStatus(order._id, e.target.value);
                            }}
                            className="px-3 py-2 rounded text-sm font-medium focus:outline-none focus:ring-2 transition-all cursor-pointer"
                            style={{
                              backgroundColor: status.bg,
                              color: status.text,
                              border: `1px solid ${status.text}30`
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="pay_later">Pay Later</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>

                        {/* Notes Preview */}
                        <div className="col-span-2">
                          {order.adminNote ? (
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" style={{ color: "#748DB0" }} />
                              <span className="text-sm truncate" style={{ color: "#3C637B" }}>
                                {order.adminNote.substring(0, 30)}...
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm italic" style={{ color: "#AAB6CB" }}>
                              No notes
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="col-span-1">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowDeleteConfirm(showConfirm ? null : order._id);
                              }}
                              className="p-2 rounded transition-all hover:opacity-80"
                              style={{
                                backgroundColor: showConfirm ? "rgba(239, 68, 68, 0.1)" : "#F5FAFD",
                                color: showConfirm ? "#ef4444" : "#3C637B"
                              }}
                              title={showConfirm ? "Cancel delete" : "Delete order"}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedOrder(isExpanded ? null : order._id);
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

                    {/* Delete Confirmation */}
                    {showConfirm && (
                      <div 
                        className="px-6 py-4 border-b"
                        style={{ 
                          backgroundColor: "rgba(239, 68, 68, 0.05)",
                          borderColor: "#D0DDEE"
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5" style={{ color: "#ef4444" }} />
                            <div>
                              <p className="font-medium" style={{ color: "#ef4444" }}>Confirm Deletion</p>
                              <p className="text-sm" style={{ color: "#3C637B" }}>
                                Are you sure you want to delete this order? This action cannot be undone.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => deleteOrder(order._id)}
                              className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2"
                              style={{
                                backgroundColor: "#ef4444",
                                color: "#FFFFFF"
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                              Yes, Delete
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(null)}
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
                      </div>
                    )}

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
                          {/* Order Details */}
                          <div className="space-y-4">
                            <h4 className="font-semibold" style={{ color: "#194C63" }}>Order Details</h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Order ID</p>
                                <p className="text-sm font-mono" style={{ color: "#0C0D14" }}>{order._id}</p>
                              </div>
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Service</p>
                                <p className="text-sm" style={{ color: "#0C0D14" }}>{order.serviceTitle}</p>
                              </div>
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Amount</p>
                                <p className="text-sm font-bold" style={{ color: "#194C63" }}>KES {order.amount || '0'}</p>
                              </div>
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Date</p>
                                <p className="text-sm" style={{ color: "#0C0D14" }}>{formatDate(order.createdAt)}</p>
                              </div>
                              {order.paymentMethod && (
                                <div>
                                  <p className="text-xs" style={{ color: "#748DB0" }}>Payment Method</p>
                                  <p className="text-sm" style={{ color: "#0C0D14" }}>{order.paymentMethod}</p>
                                </div>
                              )}
                              {order.transactionId && (
                                <div>
                                  <p className="text-xs" style={{ color: "#748DB0" }}>Transaction ID</p>
                                  <p className="text-sm font-mono" style={{ color: "#0C0D14" }}>{order.transactionId}</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Customer Details */}
                          <div className="space-y-4">
                            <h4 className="font-semibold" style={{ color: "#194C63" }}>Customer Details</h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Name</p>
                                <p className="text-sm" style={{ color: "#0C0D14" }}>{order.name}</p>
                              </div>
                              <div>
                                <p className="text-xs" style={{ color: "#748DB0" }}>Email</p>
                                <p className="text-sm">
                                  <a href={`mailto:${order.email}`} className="text-blue-600 hover:underline">
                                    {order.email}
                                  </a>
                                </p>
                              </div>
                              {order.phone && (
                                <div>
                                  <p className="text-xs" style={{ color: "#748DB0" }}>Phone</p>
                                  <p className="text-sm">
                                    <a href={`tel:${order.phone}`} className="text-blue-600 hover:underline">
                                      {order.phone}
                                    </a>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Notes Section */}
                          <div className="md:col-span-2 space-y-4">
                            <h4 className="font-semibold" style={{ color: "#194C63" }}>Admin Notes</h4>
                            
                            {editingNote === order._id ? (
                              <div className="space-y-3">
                                <textarea
                                  value={noteText}
                                  onChange={(e) => setNoteText(e.target.value)}
                                  placeholder="Add internal notes about this order..."
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
                                    onClick={() => updateNote(order._id, noteText)}
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
                              <div className="p-4 rounded-lg" style={{ backgroundColor: "#FFFFFF" }}>
                                {order.adminNote ? (
                                  <p style={{ color: "#3C637B" }}>{order.adminNote}</p>
                                ) : (
                                  <p className="italic" style={{ color: "#AAB6CB" }}>No notes added yet.</p>
                                )}
                                <button
                                  onClick={() => {
                                    setEditingNote(order._id);
                                    setNoteText(order.adminNote || "");
                                  }}
                                  className="mt-3 px-3 py-1 rounded text-sm transition-all hover:opacity-80 flex items-center gap-2"
                                  style={{
                                    backgroundColor: "#F5FAFD",
                                    border: "1px solid #AAB6CB",
                                    color: "#3C637B"
                                  }}
                                >
                                  <Edit3 className="w-3 h-3" />
                                  {order.adminNote ? "Edit Note" : "Add Note"}
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Intake Responses */}
                          {order.responses && Object.keys(order.responses).length > 0 && (
                            <div className="md:col-span-2 space-y-4">
                              <h4 className="font-semibold" style={{ color: "#194C63" }}>
                                <MessageSquare className="w-4 h-4 inline mr-2" />
                                Intake Form Responses
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg" style={{ backgroundColor: "#FFFFFF" }}>
                                {Object.entries(order.responses).map(([key, value]) => (
                                  <div key={key}>
                                    <p className="text-xs font-medium" style={{ color: "#748DB0" }}>{key}</p>
                                    <p className="text-sm mt-1" style={{ color: "#0C0D14" }}>
                                      {typeof value === 'string' ? value : JSON.stringify(value)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
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
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm" style={{ color: "#748DB0" }}>
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4" style={{ color: "#748DB0" }} />
                <span className="text-sm" style={{ color: "#3C637B" }}>
                  Total Revenue: <strong style={{ color: "#194C63" }}>KES {stats.revenue}</strong>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default IndividualOrders;