import React from 'react';
import { MessageSquarePlus, MessageSquare, LogOut, Loader2 } from 'lucide-react';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import DocumentWidget from './DocumentWidget';

const Sidebar = ({ user, refreshTrigger, chatSessions, sessionsLoading, activeSessionId, onSelectSession, onNewChat }) => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="sidebar glass-panel" role="navigation" aria-label="Chat navigation">
      <button className="new-chat-btn primary" onClick={onNewChat} aria-label="Start new chat">
        <MessageSquarePlus size={20} aria-hidden="true" />
        <span>New Chat</span>
      </button>

      <div className="history-list" role="list" aria-label="Chat history">
        {sessionsLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }} role="status" aria-label="Loading chat history" aria-live="polite">
            <Loader2 size={18} className="spin" aria-hidden="true" />
          </div>
        ) : chatSessions.length === 0 ? (
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', padding: '8px 12px' }} role="status">
            No past chats yet.
          </p>
        ) : (
          chatSessions.map((session) => (
            <div
              key={session.session_id}
              className={`history-item ${session.session_id === activeSessionId ? 'active' : ''}`}
              onClick={() => onSelectSession(session.session_id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectSession(session.session_id);
                }
              }}
              role="listitem"
              tabIndex={0}
              aria-label={`Select chat: ${session.title}`}
              aria-current={session.session_id === activeSessionId ? 'true' : 'false'}
              title={session.title}
            >
              <MessageSquare size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
              <span style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1
              }}>
                {session.title}
              </span>
            </div>
          ))
        )}
      </div>

      <DocumentWidget refreshTrigger={refreshTrigger} />

      <div className="user-profile-block">
        <div className="user-info">
          <img
            src={user?.photoURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
            alt={`${user?.displayName || 'User'}'s profile picture`}
            className="profile-pic"
          />
          <div className="user-details">
            <span className="user-name">{user?.displayName || 'User'}</span>
            <span className="user-email">{user?.email}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Sign Out" aria-label="Sign out">
          <LogOut size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
