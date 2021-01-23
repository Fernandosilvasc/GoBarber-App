# Recover password

**FN** //Functional Requirements

- Users should be able to recover passwords through provided their email; ✅
- Users should receive an email with instructions to reset their password; ✅
- Users should be able to reset the password; ✅

**NFR** // Non-functional Requirements

- Use Mailtrap to test password recovery submissions during the development environment;
- Use Amazon SES to send password recovery submissions on production environment;
- Password recovery email must be sent in the background.

**BR** // Business Requirements

- The link that has been sent to reset the password should expire in 2h; ✅
- Users must confirm the new password by entering again the password;


# Update profile

**FN** //Functional Requirements

- Users should be able to update their name, email and password; ✅

**NFR** // Non-functional Requirements

**BR** // Business Requirements

- User should not be able to update his email using an email already used;
- User must confirm his old password to update the new one;
- Users must confirm the new password by entering again the password;



# Dashboard provider

**FN** //Functional Requirements

- Providers should be able to list their appointments on a specific day;
- Providers must receive a notification always that new appointments have been created;
- Providers should be able to check the unread notifications;

**NFR** // Non-functional Requirements

- The appointments of providers must be stored on the cache;
- The notifications of providers must be stored on MongoDB;
- The notifications of providers must send in real-time by using Socket.io;

**BR** // Business Requirements

- The notification must have status read and unread;

# Create appointment

**FN** //Functional Requirements

- Users should be able to list all provider available;
- Users should be able to list the days of a month with at least one available time from the provider;
- Users should be able to list available times on a specific day for a provider;
- User should be able to create an appointment with a provider;

**NFR** // Non-functional Requirements

- The list of providers must be stored on the cache;

**BR** // Business Requirements

- Each appointment must last exactly 1 hour;
- The appointment should be available between 8am to 6pm (first start 8am and the last one will be 5pm);
- Users should not be able to create an appointment using time is already taken;
- Users should not be able to create an appointment using a time in the past;
- Users should not be able to create an appointment with themselves;
