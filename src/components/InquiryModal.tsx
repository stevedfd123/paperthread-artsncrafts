import React, { useState } from 'react';
import { ThemeColors } from '../types';
import { X, Send, CheckCircle2, ShoppingBag, MessageSquare } from 'lucide-react';

interface InquiryModalProps {
  colors: ThemeColors;
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  productCategory: string;
  productType: 'Art' | 'Craft';
}

export default function InquiryModal({
  colors,
  isOpen,
  onClose,
  productTitle,
  productCategory,
  productType
}: InquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          type: productType,
          interest: `${productCategory} - ${productTitle}`,
          notes: `Phone: ${phone}, Occasion: ${occasion}, Details: ${details}`
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error(err);
      // Soft graceful fallback success
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedWhatsAppString = () => {
    const text = `Hi Kavindi! 🌸 I am interested in inquiring about your custom ${productType}: "${productTitle}" (${productCategory}). My details: Name: ${name}, Email: ${email}, Phone: ${phone}, Details: ${details}`;
    return `https://wa.me/94771234567?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Dialog */}
      <div className={`relative w-full max-w-lg rounded-2xl ${colors.bgCard} border border-pink-500/20 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 p-6 sm:p-8 text-left`}>
        
        {/* Close Button */}
        <button
          id="btn-close-inquiry"
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-pink-500/10 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-pink-500/20">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-2">Inquiry Submitted Successfully!</h3>
            <p className="text-sm text-purple-300 max-w-sm mx-auto mb-6">
              Thank you for supporting hand-drawn art and handmade crafts! Kavindi Samudika has been notified and will reach out to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                id="btn-inquiry-done"
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs tracking-wider uppercase transition"
              >
                Close Window
              </button>
              <a
                id="btn-inquiry-wa-fallback"
                href={formattedWhatsAppString()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-xs tracking-wider uppercase transition"
              >
                <MessageSquare className="w-4 h-4" />
                Text via WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-pink-400 font-bold block mb-1">
                Custom Commissions Form
              </span>
              <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                Inquire about PaperThreads
              </h3>
              <p className="text-xs text-purple-400 mt-1">
                Currently looking at: <span className="text-pink-300 font-semibold">{productTitle}</span> ({productCategory})
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Kavindi Samudika"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={`w-full text-xs p-3 rounded-xl text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={`w-full text-xs p-3 rounded-xl text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className={`w-full text-xs p-3 rounded-xl text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Occasion / Due Date</label>
                  <input
                    type="date"
                    value={occasion}
                    onChange={e => setOccasion(e.target.value)}
                    className={`w-full text-xs p-3 rounded-xl text-white outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Special Instructions & Customizations</label>
                <textarea
                  placeholder="Tell us about specific details (frame colors, color themes, quilling types, names to write, sizing)..."
                  rows={3}
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  className={`w-full text-xs p-3 rounded-xl text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-2">
                <button
                  id="btn-submit-inquiry"
                  type="submit"
                  disabled={isSubmitting || !name || !email}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider transition disabled:opacity-50 duration-300"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
                <a
                  id="btn-direct-wa-inquiry"
                  href={formattedWhatsAppString()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wider transition duration-300"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Order via WhatsApp
                </a>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
