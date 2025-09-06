# **App Name**: CivicLog

## Core Features:

- Log Request: Create new service requests, saving the request details (description, date, category, status) locally in `localStorage`.
- Request view: Display logged service requests in a list with key details, such as submission date, category, a short description, and current status.
- Status update: Update the status of a service request. Options for the service status will be: Open, In Progress, Closed, Rejected. Status updates are persisted in the `localStorage`.
- Intelligent Status Prediction: Use an AI tool to analyze the request description and, with the city's historical data, to suggest a likely status based on similar requests. User can manually overwrite.
- Request Categorization: Categorize each service request. Example categories include: Pothole Repair, Streetlight Maintenance, Graffiti Removal, Trash Collection, Noise Complaint.
- Data persistence: Automatically save, retrieve, and update service requests stored locally in the `localStorage`.

## Style Guidelines:

- Primary color: Deep teal (#008080) for a civic, reliable feel.
- Background color: Very light greenish-blue (#E0EEEE).
- Accent color: Pale yellow-green (#9ACD32) for highlights and interactive elements.
- Body and headline font: 'PT Sans' for a clean and readable interface.
- Use simple, outlined icons from a library like FontAwesome to represent service request categories and status indicators.
- Design a clean, card-based layout to display service requests. Each card should clearly present the key details and status.
- Incorporate subtle transitions and feedback animations (e.g., a loading indicator when saving data) to enhance the user experience.