import { useState } from 'react';
import { Send, Clock } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

const initialMessages: Message[] = [
  { id: '1', text: 'hi', sender: 'other', timestamp: '6:36:00 PM' },
  { id: '2', text: 'Hi...', sender: 'other', timestamp: '12:50:31 PM' },
  { id: '3', text: 'hi', sender: 'user', timestamp: '2:06:47 PM' },
  { id: '4', text: 'hi', sender: 'user', timestamp: '2:06:47 PM' },
];

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      }),
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-8 h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Team Messages</h1>
        <p className="text-muted-foreground mt-1">Communicate with your team</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-card rounded-lg border border-border flex flex-col overflow-hidden">
        {/* Channel Header */}
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">General Channel</h2>
          <p className="text-sm text-muted-foreground">Team communication</p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-muted-foreground">U</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-xs ${
                  message.sender === 'user' ? 'chat-bubble-sent' : 'chat-bubble-received'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${
                  message.sender === 'user' ? 'justify-end' : ''
                }`}>
                  <Clock className="w-3 h-3 opacity-70" />
                  <span className="text-xs opacity-70">{message.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
            <button
              onClick={handleSend}
              className="p-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
