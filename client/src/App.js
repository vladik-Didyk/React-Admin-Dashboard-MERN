import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";

function App() {
  // Get the selected mode from the global Redux store

  const mode = useSelector((state) => state.global.mode);
  // Generate a new theme object using the selected mode

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // Render the app with the selected theme and a baseline CSS reset

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;

