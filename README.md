# Event Calendar Component

The **Event Calendar** is a simple and responsive React component that displays a **monthly calendar** with support for events. This component is built with React and SCSS and can be easily integrated into your React applications.

## Overview

The **Event Calendar** component provides a visual representation of a calendar month, where users can see events for each day. It highlights the current day, handles long event titles by truncating them, and separates event times to ensure a clean layout.


## Preview

![Event Calendar Preview](https://raw.githubusercontent.com/andresarangoa/calendar_library/refs/heads/main/assets/preview.png)


### Key Features

- **Monthly View**: Displays a complete month with days and events.
- **Current Day Highlighting**: Highlights the current day with a circular background.
- **Event Handling**:
  - Events are displayed under each day.
  - Event titles are truncated with ellipses to prevent overflow.
  - Each event occupies a single line, with the title taking up **60%** of the width and the time taking up **40%**.
- **Responsive Design**: Adjusts the layout and font size based on screen size to maintain readability and usability.

# EventCalendar Library

## Usage

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Customizing Styles](#customizing-styles)
  - [Visibility Options](#visibility-options)
- [Props](#props)
  - [eventsData](#eventsdata)
  - [styles](#styles)
- [Examples](#examples)

## Installation 

Install the @farango/calendar_library package:

bash
npm install @farango/calendar_library

### Basic Usage

Here's how to use the `EventCalendar` component with default settings:

```jsx
import React from 'react';
import { EventCalendar } from '@farango/calendar_library';

const App = () => {
  const events = [
    { date: '2024-10-21', title: 'Meeting', time: '10:00 AM' },
    { date: '2024-10-22', title: 'Workshop', time: '2:00 PM' },
    { date: '2024-10-23', title: 'Webinar', time: '11:00 AM' },
  ];

  return (
    <div>
      <EventCalendar eventsData={events} />
    </div>
  );
};

export default App;
```

# Event Calendar

Customizing Styles
You can customize the appearance of the calendar by passing a styles object as a prop:

```jsx
const customStyles = {
  colorActualDay: '#FF5733',  // Color for the current day
  colorFontTitle: '#1E90FF',  // Color for calendar title
  colorFontButtons: '#2ECC71',  // Color for buttons
  colorFontNameDays: '#34495E',  // Color for day names
  colorFontDays: '#000',  // Color for days text
  sizeFontAppoinment: '1rem',  // Font size for event titles
  sizeFontButtons: '0.9rem',  // Font size for buttons
  sizeFontNameDays: '0.8rem',  // Font size for day names
  sizeFontDays: '0.85rem',  // Font size for days
  bgHeader: '#E0E0E0',  // Background color for the header
  bgDaysNames: '#F8F8F8',  // Background color for day names row
  bgCells: '#FFFFFF',  // Background color for calendar cells
  bgActualDay: '#FFC107',  // Background color for the current day
  visibilityOptions: {
    todayButton: true,
    dropdownFilter: true,
    addEventButton: false,
    header: true,
    daysNames: true,
  },
};

<EventCalendar eventsData={events} styles={customStyles} />
```


# EventCalendar Component Documentation

## Visibility Options
The component allows you to toggle visibility for specific elements:
- **todayButton**: Shows/hides the "Today" button.
- **dropdownFilter**: Shows/hides the filter dropdown.
- **addEventButton**: Shows/hides the "Add Event" button.
- **header**: Shows/hides the calendar header.
- **daysNames**: Shows/hides the row of day names.

## Props

### `eventsData`
- **Type**: Array
- **Default**: []
- **Description**: An array of event objects. Each event should have:
  - `date` (in YYYY-MM-DD format)
  - `title` (string)
  - `time` (string)
- **Example**:
  ```javascript
  const events = [
    { date: '2024-10-21', title: 'Meeting', time: '10:00 AM' },
    { date: '2024-10-22', title: 'Workshop', time: '2:00 PM' },
  ];
  ```

  # EventCalendar Styles Documentation

## Styles

- **Type**: Object
- **Default**: See `defaultStyles` in the component
- **Description**: An object to customize the appearance of the calendar. It contains properties for colors, font sizes, background colors, and visibility options.
- **Example**:
  ```javascript
  const styles = {
    colorActualDay: '#FF0000',
    colorFontTitle: '#0000FF',
    bgHeader: '#EFEFEF',
    visibilityOptions: {
      addEventButton: false,
    },
  };
  ```

# EventCalendar Usage Examples

## Examples

### Example 1: Simple Calendar with Default Styles
```jsx
<EventCalendar eventsData={events} />
```

# EventCalendar Examples and Licensing

## Examples

### Example 2: Calendar with Custom Styles
```jsx
<EventCalendar eventsData={events} styles={customStyles} /> 
```

# EventCalendar Examples and Licensing

## Examples

### Example 3: Toggle Visibility of "Add Event" Button
```jsx
const styles = {
  visibilityOptions: {
    addEventButton: false,
  },
};

<EventCalendar eventsData={events} styles={styles} />
```

# License and Author Information

## License
- **Type**: MIT License

## Author
- **Name**: Andrés Arango

Feel free to reach out for any issues or improvements.