import { css } from 'lit-element';

export const sharedStyles = css`
  .row {
    display: flex;
    flex-direction: row;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .small-margin {
    margin-top: 6px;
  }
  .big-margin {
    margin-top: 23px;
  }

  .fill {
    flex: 1;
    height: 100%;
  }

  .center-content {
    align-items: center;
    justify-content: center;
  }
`;
