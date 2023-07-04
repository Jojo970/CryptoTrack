import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";

import LoginPage from "./scenes/loginPage/Login";
import Portfolio from "./scenes/portfolio";
import Edit from "./scenes/edit";
import Add from "./scenes/add";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element = {<LoginPage/>} />
            <Route path="/crypto-by-user/:user" element = {<Portfolio />} />
            <Route path = "/edit/:user/:id" element = {<Edit />} />
            <Route path = "/add/:user" element = {<Add />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
