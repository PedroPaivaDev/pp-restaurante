import {
  createGlobalStyle,
  DefaultTheme,
  GlobalStyleComponent
} from 'styled-components';

// eslint-disable-next-line
type GlobalStylesProps = any;

const GlobalStyles: GlobalStyleComponent<
  GlobalStylesProps,
  DefaultTheme
> = createGlobalStyle`
  :root {
    --mainHeight: 100vh;
    --mainWidth: 100vw;
    --HeaderHeigth: 60px;
    --FooterHeigth: 15px;
    --paddingIPhone: 85px;
  }

  *, *:after, *:before {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;  
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    box-sizing: border-box;
    font-family: ${(props) => props.theme.font.family};
    font-weight: ${props => props.theme.font.bold};
    font-size: ${props => props.theme.font.size.medium};
    vertical-align: middle;
    color: ${props => props.theme.colors.tertiaryColor};
  }  

  html, body {
    display: flex;
    justify-content: center;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: monospace;
  }

  a {
    text-decoration: none;
  }

  label {
    -webkit-user-select: initial;
    -khtml-user-select: initial;
    -moz-user-select: initial;
    -ms-user-select: initial;
    user-select: initial;
  }

  input, select {
    -webkit-user-select: initial;
    -khtml-user-select: initial;
    -moz-user-select: initial;
    -ms-user-select: initial;
    user-select: initial;
    appearance: none;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style:none;
  }

  img {
    max-width: 100%;
  }

  h1 {
    font-size: ${props => props.theme.font.size.xlarge};
    margin-top: 10px;
    text-align: center;
  }

  h2 {
    font-size: ${props => props.theme.font.size.large};
    margin-top: 10px;
    text-align: center;
  }

  p {
    font-weight: ${props => props.theme.font.normal};
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: ${props => props.theme.colors.mainBg} no-repeat;
    background-position: center center;
    background-size: cover;
    height: var(--mainHeight);
    width: var(--mainWidth);
    overflow: hidden;
    z-index: 0;
  }

  .page {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: var(--HeaderHeigth) 0px var(--FooterHeigth) 0px;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    text-align: center;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-bottom: calc(var(--HeaderHeigth) + var(--FooterHeigth) + var(--paddingIPhone));
  }

  .envelope {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 0px 10px;
    text-align: center;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    color: ${props => props.theme.colors.primaryColor};
  }

  .wrapper p {
    width: 100%;
  }

  .row {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .animeLeft {
    opacity: 0;
    transform: translateX(calc(-100vw * 0.2));
    animation: animeLeft .3s forwards;
  }

  @keyframes animeLeft {
    to{
        opacity: 1;
        transform: initial;
    }
  }

  @media (min-width: 40rem) {
    .container::-webkit-scrollbar {
        background: transparent;
        width: 10px;
    }

    .container::-webkit-scrollbar-track {
        background: rgba(127,105,91,0.2);
        border-radius: 10px;
        padding: 5px;
    }

    .container::-webkit-scrollbar-thumb {
        background-color: rgba(127,105,91,0.4);
        border-radius: 10px;
    }
  }

  /* @media (max-width: 21rem), (max-height: 21rem) {
    p, label, input, select, option, span, b {
      font-size: ${props => props.theme.font.size.xsmall};
    }
    h1, h2, h3, h4 {
      font-size: ${props => props.theme.font.size.medium};
    }
  } */

  /* teste slider --------------------*/
  body.paused { /* propriedades para impedir a seleção de textos durante o pause do slide */
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    text-size-adjust: none;
    -webkit-text-size-adjust: none;
    touch-action: manipulation;
  }

  #slide {
    display: grid;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  #slide-elements {
    display: grid;
    grid-area: 1/1;
  }

  #slide-elements > * {
    grid-area: 1/1;
    opacity: 0;
    visibility: none;
  }

  #slide-elements > .active {
    opacity: 1;
    visibility: visible;
  }

  #slide-controls {
    position: relative;
    grid-area: 1/1;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  #slide-controls button {
    opacity: 0;
    appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* específico para IOS */
  }

  #slide-thumb {
    display: flex;
    position: absolute;
    width: 100%;
    pointer-events: none; /* para que esse elemento de thumb não fique na frente dos botões 'prev' e 'next' */
  }

  #slide-thumb > span {
    flex: 1;
    display: block;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    margin: 5px;
    border-radius: 4px;
    overflow: hidden;
    isolation: isolate; /* para isolar os elementos, pois tem um problema no 'Safari', que quando tem borda arredondada, se eu não isolar o elemento, ele vai ficar por cima */
  }

  #slide-thumb .thumb-item.active {
    display: block;
    height: inherit; /* vai herdar a altura do elemento pai */
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    transform: translateX(-100%);
    animation: thumb forwards linear running;
  }

  #slide-thumb .thumb-item.paused {
    animation-play-state: paused;
  }

  @keyframes thumb {
    to {
      transform: initial;
    }
  }
`
export default GlobalStyles;