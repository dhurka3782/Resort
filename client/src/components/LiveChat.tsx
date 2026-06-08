import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { modalBackdrop, modalContent } from '@/lib/animations';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickReplies = [
  'Tell me about villas',
  'Booking information',
  'Dining options',
  'Spa & wellness',
  'Activities',
];

const botResponses: { [key: string]: string } = {
  villas: 'We offer three luxurious villa types: Overwater Bungalows ($1,200/night), Beach Villas ($950/night), and Presidential Suites ($2,500/night). Each features world-class amenities and stunning views.',
  booking: 'You can book directly through our availability calendar or contact our concierge team. We offer flexible check-in/check-out and special packages for extended stays.',
  dining: 'Our resort features three world-class restaurants: Oceanview (fine dining), Lagoon (casual), and Sunset Bar (drinks & appetizers). All offer stunning views and locally-sourced ingredients.',
  spa: 'Our spa offers traditional Maldivian treatments, massages, yoga, and wellness programs. Treatments can be enjoyed in your villa or at our spa center.',
  activities: 'Popular activities include snorkeling, diving, water sports, island hopping, sunset cruises, and fishing expeditions. All can be arranged through our concierge.',
};

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Welcome to Vela Resort! How can we help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = 'Thank you for your interest! Please feel free to ask more questions or contact our concierge team for personalized assistance.';

      const lowerText = text.toLowerCase();
      if (lowerText.includes('villa')) botResponse = botResponses.villas;
      else if (lowerText.includes('book')) botResponse = botResponses.booking;
      else if (lowerText.includes('dining') || lowerText.includes('restaurant')) botResponse = botResponses.dining;
      else if (lowerText.includes('spa') || lowerText.includes('wellness')) botResponse = botResponses.spa;
      else if (lowerText.includes('activity') || lowerText.includes('activities')) botResponse = botResponses.activities;

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <>
      {/* Chat Bubble */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-40 w-14 h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/30 flex items-end md:items-center justify-end md:justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl w-full md:w-96 h-96 md:h-[32rem] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="font-bold text-slate-900">Vela Resort Support</h3>
                  <p className="text-xs text-green-600 font-medium">Online</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-amber-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-slate-900 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Replies */}
              <div className="px-4 py-3 border-t border-gray-200 max-h-20 overflow-x-auto">
                <div className="flex gap-2 flex-nowrap">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSendMessage(reply)}
                      className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full hover:bg-amber-100 transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="flex gap-2 p-4 border-t border-gray-200">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(inputValue);
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
