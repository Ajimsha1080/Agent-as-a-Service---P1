import React from 'react';

export function SkeletonCard() {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse space-y-4">
      <div className="h-4 bg-slate-800 rounded w-1/3"></div>
      <div className="h-8 bg-slate-800 rounded w-2/3"></div>
      <div className="h-3 bg-slate-800 rounded w-1/2"></div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse space-y-3">
      <div className="h-4 bg-slate-800 rounded w-full mb-4"></div>
      <div className="h-4 bg-slate-800/60 rounded w-full"></div>
      <div className="h-4 bg-slate-800/60 rounded w-full"></div>
      <div className="h-4 bg-slate-800/60 rounded w-full"></div>
    </div>
  );
}
