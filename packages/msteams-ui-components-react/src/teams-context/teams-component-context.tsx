import { Colors, getContext, IContext, ThemeStyle } from 'msteams-ui-styles-core';
import * as React from 'react';
import { IInjectedTeamsProps } from './shared';

export interface ITeamsComponentProps {
  theme: ThemeStyle;
  fontSize: number;
}

export interface ITeamsComponentState {
  context: IContext;
}

export const TeamsContext = React.createContext<IInjectedTeamsProps>({
  // default value is only used when the Consumer is not nested in the Provider
  context: getContext({
    baseFontSize: 14,
    colors: Colors,
    style: ThemeStyle.Light,
  }),
});

export const TeamsComponentContext: React.StatelessComponent<ITeamsComponentProps> = (props) => (
  <TeamsContext.Provider value={{
    context: getContext({
      baseFontSize: props.fontSize,
      colors: Colors,
      style: props.theme,
    }),
  }}>
    {props.children}
  </TeamsContext.Provider>
);
