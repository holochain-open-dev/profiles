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

  .center-content {
    align-items: center;
    justify-content: center;
  }

  sp-avatar {
    --spectrum-avatar-small-height: 48px;
    --spectrum-avatar-small-width: 48px;
  }
`;
