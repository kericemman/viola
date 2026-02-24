import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import { 
  Send, 
  Users, 
  Mail, 
  Download
} from "lucide-react";

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/newsletter/subscribers");
      setSubscribers(res.data);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    if (!subject.trim() || !message.trim()) {
      alert("Please enter both subject and message");
      return;
    }

    if (!window.confirm(`Send newsletter to ${subscribers.length} subscribers?`)) {
      return;
    }

    setSending(true);
    try {
      await api.post("/newsletter/send", {
        subject,
        html: message,
      });
      
      alert("Newsletter sent successfully!");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send newsletter:", error);
      alert("Failed to send newsletter");
    } finally {
      setSending(false);
    }
  };

  const exportSubscribers = () => {
    const csv = [
      ['Email', 'Subscribed Date'],
      ...subscribers.map(s => [
        s.email,
        new Date(s.createdAt || Date.now()).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
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
            Newsletter
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-sm" style={{ color: "#3C637B" }}>
              Active subscribers: {subscribers.length}
            </p>
            <button
              onClick={exportSubscribers}
              className="px-3 py-1 rounded text-sm transition-all hover:opacity-90 flex items-center gap-2"
              style={{
                backgroundColor: "#F5FAFD",
                border: "1px solid #AAB6CB",
                color: "#3C637B"
              }}
            >
              <Download className="w-3 h-3" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Send Newsletter */}
          <div>
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D0DDEE",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
              }}
            >
              <h2 
                className="text-lg font-semibold mb-6"
                style={{ color: "#194C63" }}
              >
                Send Newsletter
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                    Subject *
                  </label>
                  <input
                    placeholder="Enter email subject"
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                    Message *
                  </label>
                  <textarea
                    placeholder="Enter email content (HTML supported)"
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all font-mono text-sm"
                    rows="8"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button
                  onClick={sendEmail}
                  disabled={sending || !subject.trim() || !message.trim()}
                  className="w-full py-3 rounded font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#194C63",
                    color: "#F5FAFD"
                  }}
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Newsletter
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Subscribers List */}
          <div>
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D0DDEE",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5" style={{ color: "#194C63" }} />
                <h2 
                  className="text-lg font-semibold"
                  style={{ color: "#194C63" }}
                >
                  Subscribers List
                </h2>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
                  <p className="mt-3" style={{ color: "#3C637B" }}>Loading subscribers...</p>
                </div>
              ) : subscribers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                    <Mail className="w-8 h-8" style={{ color: "#AAB6CB" }} />
                  </div>
                  <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                    No subscribers yet
                  </h3>
                  <p style={{ color: "#3C637B" }}>
                    Newsletter subscribers will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {subscribers.map((subscriber) => (
                    <div
                      key={subscriber.email}
                      className="p-4 rounded-lg group transition-all hover:shadow-sm"
                      style={{
                        backgroundColor: "#F5FAFD",
                        border: "1px solid #D0DDEE"
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ 
                            backgroundColor: "rgba(25, 76, 99, 0.1)"
                          }}
                        >
                          <Mail className="w-5 h-5" style={{ color: "#194C63" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p 
                            className="font-medium truncate"
                            style={{ color: "#0C0D14" }}
                          >
                            {subscriber.email}
                          </p>
                          {subscriber.createdAt && (
                            <p className="text-xs mt-1" style={{ color: "#748DB0" }}>
                              Subscribed: {new Date(subscriber.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Newsletter;