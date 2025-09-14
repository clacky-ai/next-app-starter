// Server Actions Template
// Create in app/(dashboard)/[entity]/actions.ts

'use server';

import { validatedActionWithUser } from '@/lib/auth/middleware';
import { db } from '@/lib/db/drizzle';
import { 
  {{ENTITY_PLURAL}}, 
  insert{{ENTITY}}Schema, 
  update{{ENTITY}}Schema,
  type Insert{{ENTITY}} 
} from '@/lib/db/schema';
import { eq, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const create{{ENTITY}} = validatedActionWithUser(
  insert{{ENTITY}}Schema,
  async (data: Insert{{ENTITY}}, formData, user) => {
    try {
      const [created] = await db
        .insert({{ENTITY_PLURAL}})
        .values(data)
        .returning();
      
      revalidatePath('/{{ENTITY_PLURAL}}');
      return { success: 'Created successfully', data: created };
    } catch (error) {
      return { error: 'Creation failed' };
    }
  }
);

export const update{{ENTITY}} = validatedActionWithUser(
  update{{ENTITY}}Schema.extend({ id: z.number() }),
  async (data, formData, user) => {
    try {
      const { id, ...updateData } = data;
      
      const [updated] = await db
        .update({{ENTITY_PLURAL}})
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq({{ENTITY_PLURAL}}.id, id))
        .returning();
      
      if (!updated) return { error: 'Not found' };
      
      revalidatePath('/{{ENTITY_PLURAL}}');
      return { success: 'Updated successfully', data: updated };
    } catch (error) {
      return { error: 'Update failed' };
    }
  }
);

export const delete{{ENTITY}} = validatedActionWithUser(
  z.object({ id: z.number() }),
  async ({ id }, formData, user) => {
    try {
      // Soft delete
      const [deleted] = await db
        .update({{ENTITY_PLURAL}})
        .set({ deletedAt: new Date() })
        .where(eq({{ENTITY_PLURAL}}.id, id))
        .returning();
      
      if (!deleted) return { error: 'Not found' };
      
      revalidatePath('/{{ENTITY_PLURAL}}');
      return { success: 'Deleted successfully' };
    } catch (error) {
      return { error: 'Deletion failed' };
    }
  }
);
