import { Box } from "@mui/system";
import { styled } from "@mui/system";


const WidgetWrapper = styled(Box) (({theme}) => ({
    padding: "1.5rem 1.5rem  0.75rem 1.5rem",
    backgroundColour: theme.palette.background.alt,
    borderRadius: "0.75 rem"
}))

export default WidgetWrapper;