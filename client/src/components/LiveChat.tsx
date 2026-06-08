import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Clock } from 'lucide-react';

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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

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
      setIsTyping(false);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Custom Styles to Hide Scrollbars */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {/* Enhanced Chat Bubble */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group"
        aria-label="Open chat"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-amber-400 rounded-full opacity-20"
        />
        <MessageCircle className="w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
        {!isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
          />
        )}
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-end md:justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full md:w-[28rem] h-[85vh] md:h-[36rem] flex flex-col overflow-hidden border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modern Header */}
              <div className="relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-6 text-white shrink-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-amber-600 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg tracking-tight">Vela Resort Support</h3>
                      <p className="text-xs text-amber-100 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                        Online • Typically replies instantly
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Messages Area - HIDDEN SCROLLBAR HERE */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50/50 to-white scrollbar-hide">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-sm backdrop-blur-sm ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-br-md'
                          : 'bg-white border border-gray-200 text-slate-800 rounded-bl-md shadow-md'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-2 flex items-center gap-1 ${
                        msg.sender === 'user' ? 'text-amber-100' : 'text-gray-500'
                      }`}>
                        <Clock className="w-3 h-3" />
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-gray-200 px-5 py-4 rounded-2xl rounded-bl-md shadow-md">
                      <div className="flex gap-1.5">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-amber-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-amber-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-amber-500 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies - HIDDEN SCROLLBAR HERE */}
              <div className="px-5 py-3 border-t border-gray-200 bg-white/80 backdrop-blur-sm shrink-0">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={reply}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendMessage(reply)}
                      className="px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 text-xs font-semibold rounded-full hover:from-amber-100 hover:to-amber-200 transition-all duration-300 whitespace-nowrap flex-shrink-0 border border-amber-200 shadow-sm"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-5 border-t border-gray-200 bg-white shrink-0">
                <div className="flex gap-3 items-center bg-gray-50 rounded-2xl p-2 border border-gray-200 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100 transition-all duration-300">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage(inputValue);
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-sm text-slate-800 placeholder-gray-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim()}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      inputValue.trim()
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-2">
                  Powered by Vela Resort Concierge
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}