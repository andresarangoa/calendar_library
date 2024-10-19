# Event Calendar Component

The **Event Calendar** is a simple and responsive React component that displays a **monthly calendar** with support for events. This component is built with React and SCSS and can be easily integrated into your React applications.

## Overview

The **Event Calendar** component provides a visual representation of a calendar month, where users can see events for each day. It highlights the current day, handles long event titles by truncating them, and separates event times to ensure a clean layout.

### Key Features

- **Monthly View**: Displays a complete month with days and events.
- **Current Day Highlighting**: Highlights the current day with a circular background.
- **Event Handling**:
  - Events are displayed under each day.
  - Event titles are truncated with ellipses to prevent overflow.
  - Each event occupies a single line, with the title taking up **60%** of the width and the time taking up **40%**.
- **Responsive Design**: Adjusts the layout and font size based on screen size to maintain readability and usability.

## Installation

To use the **Event Calendar** component in your project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <repository-folder>
npm install
