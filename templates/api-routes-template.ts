// API Routes Template
// Create app/api/[entity]/route.ts and app/api/[entity]/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { {{ENTITY_PLURAL}}, insert{{ENTITY}}Schema, select{{ENTITY}}Schema } from '@/lib/db/schema';
import { isNull, like, desc, eq } from 'drizzle-orm';
import { z } from 'zod';

// app/api/{{ENTITY_PLURAL}}/route.ts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    let query = db.select().from({{ENTITY_PLURAL}}).where(isNull({{ENTITY_PLURAL}}.deletedAt));
    
    if (search) {
      query = query.where(like({{ENTITY_PLURAL}}.title, `%${search}%`));
    }

    const results = await query
      .orderBy(desc({{ENTITY_PLURAL}}.createdAt))
      .limit(limit)
      .offset(offset);
    
    return NextResponse.json({ 
      success: true,
      data: results,
      pagination: { limit, offset, count: results.length }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Fetch failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = insert{{ENTITY}}Schema.parse(body);
    
    const [created] = await db
      .insert({{ENTITY_PLURAL}})
      .values(validated)
      .returning();
    
    return NextResponse.json(
      { success: true, data: created },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Creation failed' },
      { status: 500 }
    );
  }
}

// app/api/{{ENTITY_PLURAL}}/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const itemId = parseInt(id);
    
    const [item] = await db
      .select()
      .from({{ENTITY_PLURAL}})
      .where(eq({{ENTITY_PLURAL}}.id, itemId))
      .limit(1);
    
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Fetch failed' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const itemId = parseInt(id);
    const body = await request.json();
    
    const updateSchema = insert{{ENTITY}}Schema.partial();
    const validatedData = updateSchema.parse(body);
    
    const [updated] = await db
      .update({{ENTITY_PLURAL}})
      .set({ ...validatedData, updatedAt: new Date() })
      .where(eq({{ENTITY_PLURAL}}.id, itemId))
      .returning();
    
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      data: updated,
      message: 'Updated successfully' 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Update failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const itemId = parseInt(id);
    
    // Soft delete
    const [deleted] = await db
      .update({{ENTITY_PLURAL}})
      .set({ deletedAt: new Date() })
      .where(eq({{ENTITY_PLURAL}}.id, itemId))
      .returning();
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Deleted successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Delete failed' },
      { status: 500 }
    );
  }
}
