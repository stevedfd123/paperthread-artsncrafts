import React, { useState, useEffect } from 'react';
import { Reminder, ThemeColors } from '../types';
import { ChevronLeft, ChevronRight, Plus, Trash2, Calendar, Clock, Bell, Tag, Check, CalendarDays } from 'lucide-react';

interface InteractiveCalendarProps {
  colors: ThemeColors;
}

export default function InteractiveCalendar({ colors }: InteractiveCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // New Reminder form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Reminder['category']>('custom-order');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  // Hydrate reminders from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('paperthreads_reminders');
    if (saved) {
      try {
        setReminders(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse reminders", err);
      }
    } else {
      // Seed initial mock reminders for better UX
      const today = new Date();
      const in2Days = new Date();
      in2Days.setDate(today.getDate() + 2);

      const defaultReminders: Reminder[] = [
        {
          id: 'seed-1',
          title: 'Craft Anniversary Pop-Up Card Commission',
          date: today.toISOString().split('T')[0],
          time: '14:30',
          category: 'custom-order',
          notes: 'Customer requested purple and gold color themes, name engraving: Kavindi Samudika.',
        },
        {
          id: 'seed-2',
          title: 'Paper quilling workshop milestone',
          date: in2Days.toISOString().split('T')[0],
          time: '10:00',
          category: 'workshop',
          notes: 'Prepare the multi-colored quilling paper bundles and tools.',
        }
      ];
      setReminders(defaultReminders);
      localStorage.setItem('paperthreads_reminders', JSON.stringify(defaultReminders));
    }
  }, []);

  const saveReminders = (newReminders: Reminder[]) => {
    setReminders(newReminders);
    localStorage.setItem('paperthreads_reminders', JSON.stringify(newReminders));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getCalendarDays = () => {
    const numDays = daysInMonth(currentDate);
    const startOffset = firstDayOfMonth(currentDate);
    const daysArray: (Date | null)[] = [];

    // Fill offset with nulls
    for (let i = 0; i < startOffset; i++) {
      daysArray.push(null);
    }

    // Fill days
    for (let d = 1; d <= numDays; d++) {
      daysArray.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), d));
    }

    return daysArray;
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: title.trim(),
      date: selectedDateStr,
      time: time || undefined,
      category,
      notes: notes.trim() || undefined,
      notified: false
    };

    const updated = [...reminders, newReminder];
    saveReminders(updated);

    // Reset Form
    setTitle('');
    setTime('');
    setNotes('');
    setShowAddForm(false);
  };

  const handleDeleteReminder = (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    saveReminders(updated);
  };

  const getRemindersForDate = (dateStr: string) => {
    return reminders.filter(r => r.date === dateStr);
  };

  const getCategoryColor = (cat: Reminder['category']) => {
    switch (cat) {
      case 'custom-order':
        return 'bg-[#db2777] text-white'; // pink
      case 'anniversary':
        return 'bg-purple-600 text-white'; // indigo/purple
      case 'event':
        return 'bg-violet-600 text-white'; // violet
      case 'workshop':
        return 'bg-amber-500 text-black'; // amber
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCategoryBadgeClass = (cat: Reminder['category']) => {
    switch (cat) {
      case 'custom-order':
        return 'bg-pink-500/10 text-pink-400 border border-pink-500/20';
      case 'anniversary':
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'event':
        return 'bg-violet-500/10 text-violet-400 border border-violet-500/20';
      case 'workshop':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
    }
  };

  const calendarDays = getCalendarDays();
  const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  const selectedDateReminders = getRemindersForDate(selectedDateStr);

  // Reminders for today
  const todayStr = new Date().toISOString().split('T')[0];
  const todayReminders = getRemindersForDate(todayStr);

  return (
    <div className={`p-6 rounded-2xl ${colors.bgCard} border ${colors.border} ${colors.glowColor}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left side: Calendar Grid & Controller */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-6 h-6 text-pink-500" />
              <h3 className={`text-xl font-semibold font-serif ${colors.textPrimary}`}>
                {currentMonthName} {currentYear}
              </h3>
            </div>
            <div className="flex items-center gap-1 bg-black/30 p-1 rounded-lg border border-pink-500/10">
              <button
                id="btn-prev-month"
                onClick={handlePrevMonth}
                className="p-1 px-2 text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 rounded transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="btn-next-month"
                onClick={handleNextMonth}
                className="p-1 px-2 text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 rounded transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Days labels */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono tracking-widest text-pink-400 font-semibold mb-2">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, ix) => {
              if (day === null) {
                return <div key={`empty-${ix}`} className="aspect-square bg-transparent"></div>;
              }

              const dateStr = day.toISOString().split('T')[0];
              const isSelected = dateStr === selectedDateStr;
              const isToday = dateStr === todayStr;
              const dayReminders = getRemindersForDate(dateStr);

              return (
                <button
                  key={`day-${day.getDate()}`}
                  id={`calendar-day-${day.getDate()}`}
                  onClick={() => setSelectedDateStr(dateStr)}
                  className={`aspect-square rounded-xl p-1 flex flex-col justify-between items-center relative transition-all duration-300 border font-mono ${
                    isSelected
                      ? 'bg-pink-600 text-white border-pink-400 scale-105 shadow-[0_0_12px_rgba(236,72,153,0.4)]'
                      : isToday
                      ? 'bg-purple-950/40 text-pink-300 border-pink-500/50'
                      : 'bg-black/20 hover:bg-pink-500/10 text-purple-200 border-purple-900/10 hover:border-pink-500/30'
                  }`}
                >
                  <span className="text-xs font-semibold self-start ml-1 mt-1">{day.getDate()}</span>
                  
                  {/* Indicators for reminders */}
                  {dayReminders.length > 0 && (
                    <div className="flex gap-1 mb-1 justify-center max-w-full overflow-hidden px-1">
                      {dayReminders.slice(0, 3).map((r) => (
                        <span
                          key={r.id}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-white' : getCategoryColor(r.category).split(' ')[0]
                          }`}
                        ></span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Notification Banner for Today */}
          {todayReminders.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-start gap-3 animated pulse">
              <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-pink-300">Reminders for Today!</h4>
                <div className="text-xs text-purple-200 mt-1 list-disc pl-2">
                  {todayReminders.map(r => (
                    <p key={r.id} className="mt-0.5">• <span className="font-semibold text-white">{r.title}</span> {r.time ? `at ${r.time}` : ''}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right side: Selected Day Detail list & Add form */}
        <div className="w-full lg:w-96 flex flex-col border-t lg:border-t-0 lg:border-l border-purple-900/30 lg:pl-8 pt-6 lg:pt-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className={`text-base font-serif font-semibold ${colors.textPrimary}`}>
                Reminders for Day
              </h4>
              <p className="text-xs text-purple-400 font-mono mt-0.5">{selectedDateStr}</p>
            </div>
            <button
              id="btn-toggle-add-reminder"
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/20 hover:border-pink-500/40 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              {showAddForm ? 'Cancel' : 'Add New'}
            </button>
          </div>

          {/* Add Reminder Form */}
          {showAddForm ? (
            <form onSubmit={handleAddReminder} className="space-y-4 bg-purple-950/20 p-4 rounded-xl border border-pink-500/10">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Customize quilled cards"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className={`w-full text-sm p-2 rounded-lg text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition ${colors.bgInput} ${colors.border}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Time (Optional)</label>
                  <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className={`w-full text-sm p-1.5 rounded-lg text-white outline-none border focus:border-pink-500/60 transition ${colors.bgInput} ${colors.border}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as Reminder['category'])}
                    className="w-full text-xs p-2 rounded-lg text-white bg-[#140b2a] outline-none border border-pink-500/10 focus:border-pink-500/60 transition"
                  >
                    <option value="custom-order">Custom Order</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="event">Event / Order</option>
                    <option value="workshop">Workshop</option>
                    <option value="other">Other Alert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Notes</label>
                <textarea
                  placeholder="Additional details, size, colors, or client info..."
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className={`w-full text-xs p-2 rounded-lg text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition ${colors.bgInput} ${colors.border}`}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs uppercase tracking-wider transition duration-300 shadow-md shadow-pink-900/40"
              >
                <Check className="w-4 h-4" />
                Save Reminder
              </button>
            </form>
          ) : (
            // Reminders List
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {selectedDateReminders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-purple-400">
                  <Calendar className="w-10 h-10 stroke-[1.2] opacity-30 text-pink-500 mb-2" />
                  <p className="text-xs">No reminders for this day.</p>
                  <p className="text-[10px] text-purple-500/80 mt-1">Perfect day to draft paper flower arrays or paint silhouettes!</p>
                </div>
              ) : (
                selectedDateReminders.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/10 hover:border-pink-500/20 transition-all duration-300 group relative"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-6">
                        <span className={`inline-block text-[9px] font-mono font-bold uppercase py-0.5 px-2 rounded-full mb-2 ${getCategoryBadgeClass(r.category)}`}>
                          {r.category.replace('-', ' ')}
                        </span>
                        <h5 className="text-sm font-semibold text-white group-hover:text-pink-300 transition-colors">
                          {r.title}
                        </h5>
                      </div>
                      <button
                        title="Delete reminder"
                        onClick={() => handleDeleteReminder(r.id)}
                        className="text-purple-400 hover:text-rose-400 hover:bg-rose-500/10 p-1.5 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-purple-400 font-mono">
                      {r.time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-pink-500" />
                          {r.time}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-purple-400" />
                        ID: {r.id.slice(-4)}
                      </span>
                    </div>

                    {r.notes && (
                      <div className="mt-2.5 p-2 rounded-lg bg-black/40 text-[11px] text-purple-300 italic">
                        {r.notes}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
