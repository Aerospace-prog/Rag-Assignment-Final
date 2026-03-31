import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Paperclip, Loader2, FileText, Link as LinkIcon, X, Globe, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { auth } from '../../config/firebase';
import { API_BASE_URL } from '../../config/api';

const ChatArea = ({ messages, onSendMessage, user, onDocumentAdded }) => {
  const [input, setInput] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [activeDebugId, setActiveDebugId] = useState(null);

  const endOfMessagesRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';
    setIsUploading(true);
    setUploadStatus('Extracting document text...');
    try {
      const token = await auth.currentUser.getIdToken();
      const formData = new FormData();
      formData.append('document', file);
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Upload failed');
      setAttachment({ name: file.name, text: data.text, type: 'file' });
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setIsUploading(false);
      setUploadStatus('');
    }
  };

  const handleAddUrl = async (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    
    setShowUrlInput(false);
    setIsUploading(true);
    setUploadStatus('Scraping web page...');
    
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(`${API_BASE_URL}/scrape`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ url: urlInput.trim() })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Scraping failed');
      
      setAttachment({ name: data.title || urlInput, text: data.text, url: data.url, type: 'link' });
      setUrlInput('');
      
      // Signal sidebar to refresh the documents list
      if (onDocumentAdded) onDocumentAdded();
    } catch (error) {
      alert('Scraping failed: ' + error.message);
    } finally {
      setIsUploading(false);
      setUploadStatus('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() || attachment) {
      onSendMessage(input.trim(), attachment);
      setInput('');
      setAttachment(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-container" role="main" aria-label="Chat conversation">
      <div className="chat-inner">
        <div className="chat-header">
          <h1 id="chat-heading">AI Research Assistant</h1>
        </div>

        <div className="messages-area" role="log" aria-live="polite" aria-atomic="false" aria-relevant="additions" aria-labelledby="chat-heading">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`} role="article" aria-label={`${msg.sender === 'user' ? 'User' : 'AI'} message`}>
              <div className={`avatar ${msg.sender}`} aria-hidden="true">
                {msg.sender === 'user' ? (
                  <img src={user?.photoURL || ''} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                ) : (
                  <Sparkles size={20} color="#3b82f6" />
                )}
              </div>
              <div className="message-content">
                {msg.sender === 'ai' && !msg.isLoading ? (
                  <div className="markdown-prose">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : msg.sender === 'user' ? (
                  <div className="user-message-content" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {msg.attachment && (
                      <div className="message-attachment-badge" style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                        padding: '6px 10px', 
                        borderRadius: '6px', 
                        fontSize: '13px',
                        fontWeight: '500',
                        width: 'fit-content'
                      }}>
                        {msg.attachment.type === 'link' ? <Globe size={14} aria-hidden="true" /> : <FileText size={14} aria-hidden="true" />}
                        <span>{msg.attachment.name}</span>
                      </div>
                    )}
                    {msg.text && <div>{msg.text}</div>}
                  </div>
                ) : (
                  msg.text
                )}
                {msg.isLoading && <span className="typing-indicator" role="status" aria-label="AI is typing"><span>.</span><span>.</span><span>.</span></span>}
                
                {/* Debug UI for Context Chunks */}
                {msg.contextChunks && msg.contextChunks.length > 0 && (
                  <div className="debug-container">
                    <button 
                      className="info-btn"
                      onClick={() => setActiveDebugId(activeDebugId === msg.id ? null : msg.id)}
                      title="View Retrieved Context"
                      aria-label={`View ${msg.contextChunks.length} source${msg.contextChunks.length > 1 ? 's' : ''}`}
                      aria-expanded={activeDebugId === msg.id}
                      aria-controls={`context-panel-${msg.id}`}
                    >
                      <Info size={14} aria-hidden="true" />
                      <span>Sources ({msg.contextChunks.length})</span>
                    </button>
                    
                    {activeDebugId === msg.id && (
                      <div 
                        id={`context-panel-${msg.id}`}
                        className="debug-panel glass-panel" 
                        role="region" 
                        aria-label="Retrieved context chunks"
                      >
                        <div className="debug-header">
                          <h4>Retrieved Context Chunks</h4>
                          <button onClick={() => setActiveDebugId(null)} aria-label="Close context chunks"><X size={14} aria-hidden="true" /></button>
                        </div>
                        <div className="chunks-list">
                          {msg.contextChunks.map((chunk, idx) => (
                            <div key={idx} className="chunk-card" role="article" aria-label={`Source ${idx + 1} from ${chunk.document_name}`}>
                              <div className="chunk-meta">
                                <span className="chunk-source">
                                  {chunk.doc_type === 'web' ? <Globe size={12} aria-hidden="true" /> : <FileText size={12} aria-hidden="true" />}
                                  {chunk.document_name}
                                </span>
                                <span className="chunk-score" aria-label={`Relevance score: ${chunk.score.toFixed(3)}`}>Score: {chunk.score.toFixed(3)}</span>
                              </div>
                              <p className="chunk-text">"{chunk.text}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>

        <div className="input-container">
          {attachment && (
            <div className="attachment-preview" role="status" aria-label={`Attached: ${attachment.name}`} aria-live="polite">
              {attachment.type === 'link' ? <Globe size={16} aria-hidden="true" /> : <FileText size={16} aria-hidden="true" />}
              <span>{attachment.name}</span>
              <button type="button" onClick={() => setAttachment(null)} aria-label="Remove attachment"><span aria-hidden="true">✕</span></button>
            </div>
          )}

          {showUrlInput && (
            <div className="url-input-popover glass-panel" role="dialog" aria-label="Add web URL">
              <input 
                 type="url" 
                 placeholder="Paste web URL to scrape..." 
                 value={urlInput} 
                 onChange={(e) => setUrlInput(e.target.value)}
                 onKeyDown={(e) => { if (e.key === 'Enter') handleAddUrl(e); }}
                 aria-label="Web URL input"
                 autoFocus
              />
              <button type="button" onClick={handleAddUrl} className="primary-sm" aria-label="Scrape URL">Scrape</button>
              <button type="button" onClick={() => setShowUrlInput(false)} className="close-sm" aria-label="Close URL input"><X size={16} aria-hidden="true" /></button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="input-box glass-panel" role="search" aria-label="Message input form">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload}
              accept=".pdf,.txt"
              style={{ display: 'none' }}
              aria-label="File upload input"
            />
            <div className="attach-actions" role="group" aria-label="Attachment options">
              <button 
                type="button" 
                className="attach-btn" 
                onClick={() => fileInputRef.current.click()}
                disabled={isUploading || attachment != null}
                title="Upload PDF or TXT"
                aria-label="Upload PDF or TXT file"
              >
                {isUploading && uploadStatus.includes('Extracting') ? <Loader2 size={20} className="spin" aria-hidden="true" /> : <Paperclip size={20} aria-hidden="true" />}
              </button>
              <button 
                type="button" 
                className="attach-btn" 
                onClick={() => setShowUrlInput(!showUrlInput)}
                disabled={isUploading || attachment != null}
                title="Scrape Web URL"
                aria-label="Scrape web URL"
              >
                {isUploading && uploadStatus.includes('Scraping') ? <Loader2 size={20} className="spin" aria-hidden="true" /> : <LinkIcon size={20} aria-hidden="true" />}
              </button>
            </div>

            <textarea
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isUploading ? uploadStatus : "Message AI Research Assistant..."}
              rows={1}
              disabled={isUploading}
              aria-label="Message input"
              aria-describedby={isUploading ? "upload-status" : undefined}
            />
            {isUploading && <span id="upload-status" className="sr-only">{uploadStatus}</span>}
            <button 
              type="submit" 
              className="send-btn"
              disabled={(!input.trim() && !attachment) || isUploading}
              aria-label="Send message"
            >
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
