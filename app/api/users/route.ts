import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { 
  users, 
  insertUserSchema, 
  selectUserSchema,
  type NewUser 
} from '@/lib/db/schema';
import { eq, isNull } from 'drizzle-orm';
import { z } from 'zod';
import { hashPassword } from '@/lib/auth/session';

// GET - List all users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    const userList = await db
      .select()
      .from(users)
      .where(isNull(users.deletedAt))
      .limit(limit)
      .offset(offset);
    
    // Validate output with drizzle-zod select schema
    const validatedUsers = userList.map(user => {
      const { passwordHash, ...userWithoutPassword } = selectUserSchema.parse(user);
      return userWithoutPassword;
    });
    
    return NextResponse.json({ 
      data: validatedUsers,
      count: validatedUsers.length,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' }, 
      { status: 500 }
    );
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create user schema with password
    const createUserSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8).max(100),
      name: z.string().min(1).max(100).optional().nullable(),
    });
    
    const validatedData = createUserSchema.parse(body);
    const { password, ...userData } = validatedData;
    
    // Hash password
    const passwordHash = await hashPassword(password);
    
    // Create final user data
    const newUserData: NewUser = {
      ...userData,
      passwordHash
    };
    
    const [createdUser] = await db
      .insert(users)
      .values(newUserData)
      .returning();
    
    if (!createdUser) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }
    
    // Return user without password hash
    const { passwordHash: _, ...userResponse } = createdUser;
    
    return NextResponse.json(
      { 
        data: userResponse, 
        message: 'User created successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }
    
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
