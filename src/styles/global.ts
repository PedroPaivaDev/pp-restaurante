import {
  createGlobalStyle,
  css,
  DefaultTheme,
  GlobalStyleComponent
} from 'styled-components';

type GlobalStylesProps = {}

const GlobalStyles: GlobalStyleComponent<
  GlobalStylesProps,
  DefaultTheme
> = createGlobalStyle`
  :root {
    --mainHeight: calc(100vh);
    --mainWidth: 100vw;
    --HeaderHeigth: 60px;
    --FooterHeigth: 15px;
    --paddingIPhone: 85px;

    --primaryColor: rgba(86,63,57);
    --secondaryColor: #CC9132;
    --tertiaryColor: #eeebeb;
    --quaternaryColor: #FACA08;
    --font-mono: ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono',
      'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
      'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;
    --font-roboto: 'Roboto', sans-serif;
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
    font-weight: bold;
    box-sizing: border-box;
    font-family: var(--font-roboto);
    font-size: 16px;
    vertical-align: middle;
    color: var(--tertiaryColor);
    /* text-shadow: 1px 1px 5px white; */
  }  

  html, body {
    margin: 0;  
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    justify-content: center;
  }

  code {
    font-family: monospace;
  }

  a {
    text-decoration: none;
  }

  p, label, option {
    font-family: Arial, Helvetica, sans-serif;
    text-shadow: none;
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
    background-color: transparent;
    cursor: pointer;
  }

  ul {
    list-style:none;
  }

  img {
    max-width: 100%;
  }

  h1 {
    font-size: 1.4rem;
    margin-top: 10px;
    text-align: center;
  }

  h2 {
    font-size: 1.2rem;
    margin-top: 10px;
    text-align: center;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: url('./bg-1.jpg');
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
    padding: 0px 20px;
    text-align: center;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    gap: 5px;
    margin: 20px;
    text-align: center;
    color: var(--primaryColor);
  }

  .wrapper p {
    width: 100%;
  }

  .wrapper img {
    max-width: 50%;
    height: auto;
  }

  .row {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    gap: 20px;
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

  @media (max-width: 21rem), (max-height: 21rem) {
    p, label, input, select, option, span, b {font-size: 0.75rem;}
    h1, h2, h3, h4 {font-size: 1rem;}
  }

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

  ${({theme}) => css`
    html, body {
      font-family: ${theme.fonts.text};
      font-size: ${theme.fontSizes.medium};
    }
  `}
`
export default GlobalStyles;