import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  // Get the headers directly from request
  const headersList = new Headers(req.headers);
  const svix_id = headersList.get('svix-id');
  const svix_timestamp = headersList.get('svix-timestamp');
  const svix_signature = headersList.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400
    });
  }

  // Get the event type
  const { type } = evt;
  const eventData = evt.data;

  // Initialize Supabase client directly
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Type guard to check if this is a user event
  const isUserEvent = (type: string): boolean => {
    return ['user.created', 'user.updated', 'user.deleted'].includes(type);
  };

  if (isUserEvent(type)) {
    // Handle different user event types
    if (type === 'user.created' || type === 'user.updated') {
      // For these events, we expect user data fields
      // TypeScript doesn't know the exact shape based on event type,
      // so we need to cast or handle the possibility of missing fields
      const userData = eventData as any; // Using any as a temporary solution
      
      const id = userData.id;
      const email = userData.email_addresses?.[0]?.email_address || '';
      const firstName = userData.first_name || '';
      const lastName = userData.last_name || '';
      const phone = userData.phone_numbers?.[0]?.phone_number || null;
      
      if (type === 'user.created') {
        // Insert new user
        const { error } = await supabase
          .from('users')
          .insert({
            clerk_id: id,
            email,
            first_name: firstName,
            last_name: lastName,
            phone,
            user_type: 'student', // Default role
            status: 'trial' // Default status
          });
  
        if (error) {
          console.error('Error inserting user into Supabase:', error);
          return new Response('Error synchronizing with database', {
            status: 500
          });
        }
      } else {
        // Update existing user
        const { error } = await supabase
          .from('users')
          .update({
            email,
            first_name: firstName,
            last_name: lastName,
            phone,
            updated_at: new Date().toISOString()
          })
          .eq('clerk_id', id);
  
        if (error) {
          console.error('Error updating user in Supabase:', error);
          return new Response('Error updating user in database', {
            status: 500
          });
        }
      }
    } else if (type === 'user.deleted') {
      // For deletion, we only need the ID
      const id = eventData.id as string;
      
      // Delete the user
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('clerk_id', id);

      if (error) {
        console.error('Error deleting user from Supabase:', error);
        return new Response('Error deleting user from database', {
          status: 500
        });
      }
    }
  }

  return new Response('Webhook processed successfully', {
    status: 200
  });
} 