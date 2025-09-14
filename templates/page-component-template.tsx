// Page Component Template
// Create list page app/(dashboard)/[entity]/page.tsx

import { db } from '@/lib/db/drizzle';
import { {{ENTITY_PLURAL}} } from '@/lib/db/schema';
import { isNull, desc } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default async function {{ENTITY_TITLE}}Page() {
  const itemList = await db
    .select()
    .from({{ENTITY_PLURAL}})
    .where(isNull({{ENTITY_PLURAL}}.deletedAt))
    .orderBy(desc({{ENTITY_PLURAL}}.createdAt))
    .limit(20);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{{ENTITY_TITLE}}</h1>
        <Button asChild>
          <Link href="/{{ENTITY_PLURAL}}/create">Add {{ENTITY}}</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {itemList.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {/* Add item details here */}
              </p>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/{{ENTITY_PLURAL}}/${item.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {itemList.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No {{ENTITY_PLURAL}} found.</p>
          <Button asChild className="mt-4">
            <Link href="/{{ENTITY_PLURAL}}/create">Create your first {{ENTITY_SINGULAR}}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
