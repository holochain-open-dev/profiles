import { css } from 'lit-element';

export const sharedStyles = css`
  .column {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    flex-direction: row;
  }

  .title {
    font-size: 20px;
  }

  .fill {
    flex: 1;
  }

  .center-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :host {
    display: flex;
  }

  .placeholder {
    opacity: 0.7;
    text-align: center;
  }


  .flex-scrollable-parent {
    position: relative;
    display: flex;
    flex: 1;
  }

  .flex-scrollable-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .flex-scrollable-x {
    max-width: 100%;
    overflow-x: auto;
  }
  .flex-scrollable-y {
    max-height: 100%;
    overflow-y: auto;
  }
`;
