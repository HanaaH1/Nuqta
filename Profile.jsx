import React from 'react';
import { Flame, Trophy, Target, Calendar, ChevronRight, Settings, Bell, HelpCircle } from 'lucide-react';

const STATS = [
{ label: 'Total Points', value: '1,250', icon: Trophy, color: 'text-yellow-600 bg-yellow-50' },
{ label: 'Current Streak', value: '7 days', icon: Flame, color: 'text-orange-500 bg-orange-50' },
{ label: 'Dots Completed', value: '84', icon: Target, color: 'text-primary bg-primary/10' },
{ label: 'Days Active', value: '23', icon: Calendar, color: 'text-blue-500 bg-blue-50' }];


const MENU_ITEMS = [
{ label: 'Notifications', icon: Bell },
{ label: 'Settings', icon: Settings },
{ label: 'Help & Support', icon: HelpCircle }];


export default function Profile() {
  return (
    <div className="pt-12 pb-6">
      {/* Profile header */}
      <div className="px-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center text-2xl font-bold text-primary">
          Y
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Yusuf Ali</h1>
          <p className="text-sm text-muted-foreground">Member since March 2026</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 px-6 mt-6">
        {STATS.map(({ label, value, icon: Icon, color }) =>
        <div key={label} className="bg-card rounded-2xl border border-border p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <p className="text-lg font-bold text-foreground mt-3">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="px-6 mt-8">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {MENU_ITEMS.map(({ label, icon: Icon }, i) =>
          <button
            key={label}
            className={`w-full flex items-center justify-between px-5 py-4 text-left hover:bg-accent/50 transition-colors ${
            i < MENU_ITEMS.length - 1 ? 'border-b border-border' : ''}`
            }>
            
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </div>);

}