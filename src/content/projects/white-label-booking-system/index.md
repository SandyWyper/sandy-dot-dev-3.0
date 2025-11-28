---
# posttype: "projects"
date: "2024-12-01"
title: "White Label Booking System"
order: 1
description: "A hackathon project where we built a white label booking system. The idea being that we could adapt this boilerplate for multiple needs and easily add it to existing websites."
category: "Hackathon Project"
cover: "./screenshot.png"
coverAlt: "White Label Booking System"
tags:
  - "Django"
  - "Python"
  - "PostgreSQL"
  - "Tailwind CSS"
  - "DaisyUI"
  - "Hackathon"
repository: "https://github.com/SandyWyper/White-Label-Booking-System"
live: "https://white-label-booking-system-9286cdf7aa1e.herokuapp.com/"
---

> A plug and play Django booking system designed to be easily integrated into any Django site. Perfect for demos, rapid prototyping, or as a foundation for more advanced booking solutions.

This project came out of a hackathon where the goal was to build something useful that could be "bolted on" to an existing Django project with minimal friction. The result is a white label booking system that handles the core booking workflow—bookable items, time slots, and user reservations—with authentication built in and styling that can be easily adapted to match any brand.

## The Problem

Most booking systems are either too complex (full featured SaaS solutions) or too simple (basic forms that don't handle availability). We wanted something in between: a Django app that you could drop into a project, run migrations, and have a working booking system in minutes. The system includes user authentication, slot management, and styling that can be easily customised, but keeps the core booking logic simple and extensible.

## Why Django?

Django's app structure made this project a perfect fit. The entire booking system lives in a single `bookings/` app that can be copied into any Django project. The models are self contained, the views handle the booking logic, and the templates are minimal enough to be easily customised.

I used **Django 4.2** with **Python 3.13**, which gave me access to modern Django features while keeping the codebase clean and maintainable. The admin interface was particularly useful during development—I could quickly create bookable items and time slots without writing custom management commands.

## The Tech Stack

The stack is intentionally minimal:

- **Django 4.2** - The framework handling everything
- **PostgreSQL** - For production (SQLite works fine for development)
- **Tailwind CSS** - Utility first CSS framework for styling
- **DaisyUI** - Component library built on top of Tailwind CSS

Django's form handling made the booking workflow straightforward. The forms package handles validation and submission, while Tailwind CSS and DaisyUI provide a clean, modern interface that can be easily customised to match any brand.

## Building the Models

The data model is straightforward but flexible:

- **BookableItem** - Resources that can be booked (tables, rooms, courts, etc.)
- **TimeSlot** - Available time slots for each item
- **Booking** - Guest reservations linking slots to guest information

Django's ORM made querying available slots simple. I could filter slots by date, check if they're already booked, and present only available options to users. The relationship between items, slots, and bookings is handled through foreign keys, which Django manages elegantly.

```python
# Example: Finding available slots for a date
available_slots = TimeSlot.objects.filter(
    bookable_item=selected_item,
    start_time__date=selected_date,
    booking__isnull=True  # Not already booked
)
```

## Form Handling

Django's forms package handles the booking workflow elegantly. The booking form collects user input, validates the data, and processes submissions. When users select dates and time slots, the form validates availability and prevents double booking. All of this happens server side, keeping the frontend simple and maintainable.

## User Booking Workflow

The system allows guests to browse available slots and view booking information, but requires users to create an account and log in to make a booking. This approach balances accessibility with accountability—anyone can see what's available, but bookings are tied to authenticated user accounts.

The booking form collects:

- Selected date and time slot
- User information (from authenticated account)
- Additional notes (optional)

The system validates that the slot is still available at submission time (to prevent double booking), creates the booking, and links it to the user's account. This makes it easy for users to view and manage their bookings.

## Admin Interface

Django's admin panel handles all the management tasks:

- Create and manage bookable items
- Add time slots for each item
- View all bookings
- Cancel bookings
- Delete slots

The admin interface is fully functional out of the box, which means you can start managing bookings immediately without building custom admin views.

## Testing

The project includes comprehensive unit tests covering:

- **User Tests**: Viewing booking pages, booking slots, viewing personal bookings, cancelling bookings
- **Admin Tests**: Accessing staff dashboard, creating time slots, managing bookings
- **Guest Tests**: Can view booking pages and available slots, but cannot make bookings without authentication
- **Edge Cases**: Booking already booked slots, invalid data, permission violations

Running `python3 manage.py test bookings` validates that everything works as expected. The test coverage helps ensure the system behaves correctly even as it's customised for different use cases.

## What I Learned

Building this booking system taught me a few valuable lessons:

**Django apps are powerful.** The ability to package functionality into a reusable app that can be dropped into any Django project is incredibly useful. The `bookings/` app is self contained—it has its own models, views, templates, and static files. You can copy it, customise it, and deploy it.

**Tailwind CSS and DaisyUI make styling effortless.** The combination of Tailwind's utility classes and DaisyUI's component library meant we could build a polished interface quickly. The theme selector feature demonstrates how easily the entire system can be rebranded, which is crucial for a white label solution.

**Simple is better than perfect.** This system doesn't handle payments, email notifications, or recurring bookings. But it does handle the core booking workflow well, and that's enough for many use cases. You can always extend it later.

**PostgreSQL migrations are seamless.** Moving from SQLite (development) to PostgreSQL (production) was as simple as changing the database URL. Django's ORM abstracts away the differences, so the same code works with both databases.

## Using It as a Guest

If you want to explore the booking system as a guest user, here's what you can do:

1. **Visit the booking page** - You'll see a list of available bookable items (tables, rooms, etc.)

2. **Browse available slots** - Select an item and view available dates and time slots

3. **View booking information** - See what's available without needing to log in

To make a booking, you'll need to:

4. **Create an account** - Register with your email and password

5. **Log in** - Access your account to make bookings

6. **Select a slot** - Choose your preferred date and time

7. **Submit your booking** - The system validates availability and creates your reservation

Once logged in, you can view all your bookings, manage reservations, and see your booking history.

## Styling and Customisation

One of the standout features of this white label system is how easily it can be styled to match any brand. We built in a DaisyUI theme selector dropdown that allows clients to preview how the booking system looks with different DaisyUI themes. This demonstrates how quickly the entire interface can be transformed to match an existing website's style.

The theme selector includes all of DaisyUI's built in themes—from light and dark modes to themed variations like cupcake, bumblebee, synthwave, and many more. With a single selection, the entire booking interface updates to reflect the chosen theme, showing clients just how adaptable the system is.

Beyond the theme selector, the system is built with Tailwind CSS and DaisyUI, which means:

- **Easy styling**: Use Tailwind utility classes or DaisyUI components
- **Theme customisation**: Switch between DaisyUI themes or create custom themes
- **Brand matching**: Adjust colours, fonts, and spacing to match your brand
- **Responsive design**: Built in responsive utilities work out of the box

The codebase is clean and well commented, making it easy to understand and modify. Whether you want to use a pre built DaisyUI theme or create a completely custom design, the Tailwind/DaisyUI foundation makes it straightforward.

## Additional Customisation

Beyond styling, the system can be extended in other ways:

- **Models**: Extend the models to add pricing, location, or other fields
- **Templates**: Customise the booking form layout and functionality
- **Integrations**: Add payment processing, email notifications, or calendar sync

## Final Thoughts

This booking system was a great exercise in building something useful without overengineering it. It handles the core booking workflow, integrates easily with Django projects, and can be customised for different use cases. Whether you're building a restaurant reservation system, a room booking app, or a court scheduling tool, this provides a solid foundation.

The hackathon format forced me to focus on what mattered: a working booking system that could be integrated quickly. Sometimes the best solutions are the simplest ones.

If you're interested in using or contributing to the project, check out the [GitHub repository](https://github.com/SandyWyper/White-Label-Booking-System). The code is open source and ready to be customised for your needs.
