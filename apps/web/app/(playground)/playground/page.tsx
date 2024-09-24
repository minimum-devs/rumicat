import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SendTestEmail } from '@/components/send-test-email';
import { PreviewEmail } from '@/components/preview-email';
import { EditorPreview } from '@/components/editor-preview';
import { ApiConfiguration } from '@/components/api-config';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = {};

export default async function Playground() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/template');
  }

  return (
    <main className="mx-auto w-full max-w-[calc(36rem+40px)] px-5">
      <div className="mt-6 flex items-center gap-1.5">
        <ApiConfiguration />
        <PreviewEmail />
        <SendTestEmail />
      </div>
      <EditorPreview />
    </main>
  );
}
