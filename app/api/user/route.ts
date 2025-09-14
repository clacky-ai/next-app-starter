import { getUser } from '@/lib/db/queries';
import { selectUserSchema } from '@/lib/db/schema';

export async function GET() {
  try {
    const user = await getUser();
    
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Validate output with drizzle-zod select schema
    const validatedUser = selectUserSchema.parse(user);
    
    return Response.json({ data: validatedUser });
  } catch (error) {
    console.error('Error fetching user:', error);
    return Response.json(
      { error: 'Failed to fetch user' }, 
      { status: 500 }
    );
  }
}
