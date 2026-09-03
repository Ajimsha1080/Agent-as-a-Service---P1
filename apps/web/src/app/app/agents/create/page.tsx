'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AgentBuilderPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/app/agents');
  }, [router]);

  return (
    <div className="py-12 text-center text-xs text-zinc-500 font-mono">
      Redirecting to Predefined Enterprise Agents Catalog...
    </div>
  );
}
