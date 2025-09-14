// Form Component Template
// Create form component components/[entity]/[entity]-form.tsx

'use client';

import { create{{ENTITY}} } from '@/app/(dashboard)/{{ENTITY_PLURAL}}/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useActionState } from 'react';
import type { Insert{{ENTITY}} } from '@/lib/db/schema';

interface {{ENTITY}}FormProps {
  initialData?: Partial<Insert{{ENTITY}} & { id: number }>;
  mode?: 'create' | 'edit';
}

export function {{ENTITY}}Form({ initialData, mode = 'create' }: {{ENTITY}}FormProps) {
  const [state, formAction, isPending] = useActionState(create{{ENTITY}}, null);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Add New {{ENTITY}}' : 'Edit {{ENTITY}}'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input 
              id="title"
              name="title" 
              placeholder="Enter title"
              defaultValue={initialData?.title || ''}
              required 
              disabled={isPending}
            />
          </div>
          
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content"
              name="content" 
              placeholder="Enter content"
              defaultValue={initialData?.content || ''}
              disabled={isPending}
              rows={4}
            />
          </div>

          {/* Add more fields as needed */}

          {state?.error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
              {state.error}
            </div>
          )}
          
          {state?.success && (
            <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded">
              {state.success}
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isPending}
          >
            {isPending ? 'Processing...' : (mode === 'create' ? 'Create' : 'Update')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
