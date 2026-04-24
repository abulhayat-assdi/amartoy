"use client";

import { useState, useEffect, useRef } from "react";
import { Paperclip, Send, Trash2, AlertTriangle } from "lucide-react";
import { db } from "@/lib/firebase";
import { 
  collection, 
  doc, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp, 
  orderBy, 
  query,
  getDocs
} from "firebase/firestore";

interface ChatMessage {
  id: string;
  sender: "user" | "admin";
  text: string;
  time: string;
  createdAt?: any;
}

interface ChatSession {
  id: string;
  user: {
    name: string;
    initials: string;
    roll?: string;
    batch?: string;
  };
  lastMessage: string;
  lastTime: string;
  updatedAt?: any;
  messages: ChatMessage[];
}

export function LiveSupportChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("");
  const [replyText, setReplyText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, activeSessionId]);

  // Fetch real-time sessions
  useEffect(() => {
    const q = query(collection(db, "chat_sessions"), orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSessions: ChatSession[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        let lastTimeStr = "";
        if (data.updatedAt?.toDate) {
          lastTimeStr = data.updatedAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        fetchedSessions.push({
          id: docSnap.id,
          user: data.user || { name: "Unknown User", initials: "U" },
          lastMessage: data.lastMessage || "",
          lastTime: lastTimeStr,
          messages: [] // Messages will be loaded when a session is selected
        });
      });
      setSessions(fetchedSessions);
    });

    return () => unsubscribe();
  }, []);

  // Fetch real-time messages for active session
  useEffect(() => {
    if (!activeSessionId) return;

    const messagesRef = collection(db, "chat_sessions", activeSessionId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: ChatMessage[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        let timeStr = "";
        if (data.createdAt?.toDate) {
          timeStr = data.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        msgs.push({
          id: docSnap.id,
          sender: data.sender,
          text: data.text,
          time: timeStr || "Just now",
          createdAt: data.createdAt
        });
      });

      setSessions(current => 
        current.map(s => s.id === activeSessionId ? { ...s, messages: msgs } : s)
      );
    });

    return () => unsubscribe();
  }, [activeSessionId]);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  const handleSend = async () => {
    if (!replyText.trim() || !activeSessionId) return;
    
    const messageText = replyText;
    setReplyText(""); // Clear input immediately for better UX
    
    try {
      const messagesRef = collection(db, "chat_sessions", activeSessionId, "messages");
      await addDoc(messagesRef, {
        sender: "admin",
        text: messageText,
        createdAt: serverTimestamp()
      });

      const sessionRef = doc(db, "chat_sessions", activeSessionId);
      await updateDoc(sessionRef, {
        lastMessage: messageText,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleDeleteConversation = async () => {
    if (!activeSessionId) return;
    
    try {
      // Get all messages in subcollection
      const messagesRef = collection(db, "chat_sessions", activeSessionId, "messages");
      const messagesSnap = await getDocs(messagesRef);
      
      // Delete all messages
      const deletePromises = messagesSnap.docs.map(msgDoc => deleteDoc(doc(db, "chat_sessions", activeSessionId, "messages", msgDoc.id)));
      await Promise.all(deletePromises);
      
      // Delete session document
      await deleteDoc(doc(db, "chat_sessions", activeSessionId));
      
      setActiveSessionId("");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  return (
    <section className="live-chat-section">
      <div className="admin-section-title" style={{ marginBottom: '1.25rem' }}>
        <span />
        <div>
          <h2 className="admin-page__title" style={{ fontSize: '1.8rem', color: '#0f5c40' }}>Live Support</h2>
          <p className="admin-page__description">Real-time messaging with customers</p>
        </div>
      </div>

      <div className="live-chat-container">
        {/* Sidebar */}
        <aside className="live-chat-sidebar">
          <div className="live-chat-sidebar__header">
            <div>
              <h3>Live Support</h3>
              <p>Real-time messaging with customers</p>
            </div>
            <span className="live-chat-badge">{sessions.length}</span>
          </div>

          <div className="live-chat-list">
            {sessions.map(session => (
              <button 
                key={session.id}
                className={`live-chat-item ${activeSessionId === session.id ? 'active' : ''}`}
                onClick={() => setActiveSessionId(session.id)}
              >
                <div className="live-chat-avatar">{session.user.initials}</div>
                <div className="live-chat-item__info">
                  <div className="live-chat-item__top">
                    <strong>{session.user.name}</strong>
                    <span className="live-chat-time">{session.lastTime}</span>
                  </div>
                  <p className="live-chat-item__msg">{session.lastMessage}</p>
                </div>
              </button>
            ))}
            {sessions.length === 0 && (
              <div className="live-chat-empty-sidebar">
                No active conversations.
              </div>
            )}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="live-chat-main">
          {activeSession ? (
            <>
              <header className="live-chat-main__header">
                <div className="live-chat-main__user">
                  <div className="live-chat-avatar live-chat-avatar--sm">{activeSession.user.initials}</div>
                  <div>
                    <strong>{activeSession.user.name}</strong>
                    {activeSession.user.roll && (
                      <p>Roll: {activeSession.user.roll} &nbsp; Batch: {activeSession.user.batch}</p>
                    )}
                  </div>
                </div>
                <button 
                  className="live-chat-delete-btn" 
                  onClick={() => setShowDeleteModal(true)}
                  aria-label="Delete conversation"
                >
                  <Trash2 size={18} />
                </button>
              </header>

              <div className="live-chat-messages">
                {activeSession.messages && activeSession.messages.map(msg => (
                  <div key={msg.id} className={`live-chat-msg-row ${msg.sender === 'admin' ? 'admin' : 'user'}`}>
                    <div className="live-chat-bubble">
                      <p>{msg.text}</p>
                      <span>{msg.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="live-chat-composer">
                <div className="live-chat-composer__inner">
                  <input 
                    type="text" 
                    placeholder="Write your reply..." 
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                  />
                  <button className="live-chat-composer__attach" title="Attach file">
                    <Paperclip size={18} />
                  </button>
                </div>
                <button className="live-chat-composer__send" onClick={handleSend} title="Send reply">
                  <Send size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="live-chat-empty">
              <p>Select a conversation to start chatting.</p>
            </div>
          )}
        </main>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="homepage-admin__modal" role="dialog">
          <button className="homepage-admin__modal-backdrop" type="button" onClick={() => setShowDeleteModal(false)} />
          <div className="homepage-admin__modal-panel live-chat-modal-panel">
            <div className="live-chat-modal-icon">
              <AlertTriangle size={32} />
            </div>
            <h3 className="live-chat-modal-title">Delete Conversation?</h3>
            <p className="live-chat-modal-desc">
              This will <strong>permanently delete</strong> all messages and files for both parties. Cannot be undone.
            </p>
            <div className="live-chat-modal-actions">
              <button className="live-chat-btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="live-chat-btn-delete" onClick={handleDeleteConversation}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
