# Birthday Countdown 🎉

A simple web application that displays a countdown timer to your next birthday. Once the countdown reaches zero, it displays a celebratory message.

## Features
- Dynamically calculates the time remaining until your next birthday.
- Displays the countdown in days, hours, minutes, and seconds.
- Automatically adjusts for past birthdays by counting down to the next year's birthday.
- Responsive and visually appealing design.

## Technologies Used
- **HTML**: For the structure of the webpage.
- **CSS**: For styling and layout.
- **JavaScript**: For the countdown logic.

## How to Use
1. Clone or download this repository.
2. Open the `index.html` file in your browser.
3. The countdown will automatically calculate the time remaining until November 11 (default birthday).

## Customization
To change the birthday:
1. Open the `index.js` file.
2. Modify the `MY_BIRTHDAY_MONTH` and `MY_BIRTHDAY_DAY` constants to match your birthday:
   ```js
   const MY_BIRTHDAY_MONTH = 11; // Month (1-12)
   const MY_BIRTHDAY_DAY = 11;  // Day (1-31)
   ```

## Project Structure
```
Birthday-Countdown/
├── README.md         # Project documentation
├── src/
│   ├── index.html    # Main HTML file
│   ├── index.js      # Countdown logic
│   └── styles.css    # Styling for the application
```

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License
This project is created for educational purpose.
