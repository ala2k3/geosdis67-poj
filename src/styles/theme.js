import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import blueGrey from "@material-ui/core/colors/blueGrey";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[700]
    },
    secondary: {
      main: blueGrey[200]
    }
  },
  typography: {
    fontFamily: "Roboto Condensed"
  }
});
