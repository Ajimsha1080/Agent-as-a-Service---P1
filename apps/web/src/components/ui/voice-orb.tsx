'use client';
import React from 'react';
import { Mic, MicOff, Volume2, Loader2 } from 'lucide-react';

interface VoiceOrbProps {
  state: 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';
  onToggleRecord?: () => void;
}

export function VoiceOrb({ state, onToggleRecord }: VoiceOrbProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      {/* Animated Orb */}
      <div 
        onClick={onToggleRecord}
        className={`w-32 h-32 rounded-full cursor-pointer flex items-center justify-center transition-all duration-500 shadow-2xl relative ${
          state === 'listening' 
            ? 'bg-gradient-to-tr from-teal-500 via-emerald-400 to-cyan-400 animate-pulse-glow scale-110' 
            : state === 'thinking'
            ? 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 animate-spin scale-105'
            : state === 'speaking'
            ? 'bg-gradient-to-tr from-emerald-500 via-teal-400 to-blue-500 scale-105 shadow-teal-500/50'
            : 'bg-slate-800 border-2 border-slate-700 hover:border-teal-500/50'
        }`}
      >
        <div className="w-24 h-24 rounded-full bg-slate-950/40 backdrop-blur-md flex items-center justify-center">
          {state === 'listening' && <Mic className="w-10 h-10 text-white animate-pulse" />}
          {state === 'thinking' && <Loader2 className="w-10 h-10 text-purple-300 animate-spin" />}
          {state === 'speaking' && <Volume2 className="w-10 h-10 text-emerald-300 animate-bounce" />}
          {state === 'idle' && <Mic className="w-10 h-10 text-slate-400 hover:text-teal-400" />}
        </div>
      </div>

      {/* State Label */}
      <div className="text-center">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          state === 'listening' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' :
          state === 'thinking' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
          state === 'speaking' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
          'bg-slate-800 text-slate-400'
        }`}>
          ● {state.toUpperCase()}
        </span>
        <p className="text-xs text-slate-400 mt-2">
          {state === 'idle' && 'Click the orb or microphone to start voice inquiry'}
          {state === 'listening' && 'Listening to guest voice input...'}
          {state === 'thinking' && 'Processing STT & querying hospitality tools...'}
          {state === 'speaking' && 'Streaming AI voice response via TTS...'}
        </p>
      </div>
    </div>
  );
}
