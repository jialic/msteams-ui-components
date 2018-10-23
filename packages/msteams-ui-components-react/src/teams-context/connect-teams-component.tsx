import * as React from 'react';
import { TeamsContext } from './teams-component-context';
import { IInjectedTeamsProps } from '.';

export function connectTeamsComponent<TChildProps>(Component: React.ComponentType<TChildProps & IInjectedTeamsProps>): React.ComponentType<TChildProps> {
  class ConnectedTeamsComponent extends React.Component<TChildProps & { forwardedRef: any }> {
    render() {
      const { forwardedRef, ...rest } = this.props as any;

      return (
        <TeamsContext.Consumer>
          {context => (
            <Component ref={forwardedRef} {...rest} {...context} />
          )}
        </TeamsContext.Consumer>
      );
    }
  }

  return React.forwardRef((props: TChildProps, ref: any) => {
    return (
      <ConnectedTeamsComponent {...props} forwardedRef={ref} />
    );
  });
}
