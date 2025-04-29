import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

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

  // Initialize Supabase client
  const supabase = createRouteHandlerClient({ cookies });

  // Handle user creation
  if (type === 'user.created') {
    const { id, email_addresses, first_name, last_name, phone_numbers } = eventData;
    
    // Insert into users table in Supabase
    const { error } = await supabase
      .from('users')
      .insert({
        clerk_id: id,
        email: email_addresses[0]?.email_address,
        first_name: first_name || '',
        last_name: last_name || '',
        phone: phone_numbers[0]?.phone_number,
        user_type: 'student', // Default role
        status: 'trial' // Default status
      });

    if (error) {
      console.error('Error inserting user into Supabase:', error);
      return new Response('Error synchronizing with database', {
        status: 500
      });
    }
  }

  // Handle user updates
  if (type === 'user.updated') {
    const { id, email_addresses, first_name, last_name, phone_numbers } = eventData;
    
    // Update user in Supabase
    const { error } = await supabase
      .from('users')
      .update({
        email: email_addresses[0]?.email_address,
        first_name: first_name || '',
        last_name: last_name || '',
        phone: phone_numbers[0]?.phone_number,
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

  // Handle user deletion
  if (type === 'user.deleted') {
    const { id } = eventData;
    
    // Supabase will handle cascading deletes through ON DELETE CASCADE
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

  return new Response('Webhook processed successfully', {
    status: 200
  });
} 