"use client"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

// const theme = createTheme({
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             appearance: 'none',
//             backgroundColor: 'transparent',
//             border: '2px solid #1A1A1A',
//             borderRadius: '15px',
//             boxSizing: 'border-box',
//             color: '#3B3B3B',
//             cursor: 'pointer',
//             fontFamily: 'Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
//             margin: 0,
//             outline: 'none',
//             textDecoration: 'none',
//             transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)',
//             userSelect: 'none',
//             touchAction: 'manipulation',
//             willChange: 'transform',
//             '&:disabled': {
//               pointerEvents: 'none',
//             },
//             '&:hover': {
//               color: '#fff',
//               backgroundColor: '#1A1A1A',
//               boxShadow: 'rgba(0, 0, 0, 0.25) 0 8px 15px',
//               transform: 'translateY(-2px)',
//             },
//             '&:active': {
//               boxShadow: 'none',
//               transform: 'translateY(0)',
//             },
//           },
//         },
//       },
//     },
//   });
const theme = createTheme({
    palette:{
        background:{
            default: '#f5f5f7'
        }
    },
    typography:{
        fontFamily:"Source Sans 3",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#007aff',
            border: '1px solid transparent', // Border style
            borderRadius: '25px', // Border radius
            boxSizing: 'border-box',
            color: '#FFFFFF', // Text color
            cursor: 'pointer',
            flex: '0 0 auto',
            lineHeight: '1.5rem', // Line height
            padding: '.75rem 1.2rem', // Padding
            textAlign: 'center',
            textDecoration: 'none', // Text decoration
            transitionDuration: '.2s', // Transition duration
            transitionProperty: 'background-color, border-color, color, fill, stroke',
            transitionTimingFunction: 'cubic-bezier(.4, 0, 0.2, 1)',
            userSelect: 'none',
            touchAction: 'manipulation',
            width: 'auto',
            // '&:hover': {
            //   backgroundColor: '#374151', // Hover background color
            // },
            // '&:focus': {
            //   boxShadow: 'none',
            //   outline: '2px solid transparent',
            //   outlineOffset: '2px',
            // },
          },
        },
      },
    },
    
  });
export default theme;
