import { createGlobalStyle } from "styled-components";

const FontStyles = createGlobalStyle`
@font-face {
    font-family: SegoeUI;
    src:
        local("Segoe UI Light"),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff2) format("woff2"),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff) format("woff"),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.ttf) format("truetype");
    font-weight: 100;
}
`;

export default FontStyles;
