import { radioButtonGroup } from 'msteams-ui-styles-core/lib/components/radio-button-group';
import * as React from 'react';
import { connectTeamsComponent } from '../teams-context/connect-teams-component';
import classes from '../utils/classes';
import uniqueId from '../utils/uniqueId';
import { IInjectedTeamsProps, IRadiobuttonProps } from '..';
import { map } from 'lodash';
import { Radiobutton } from './radiobutton';

export interface IRadiobuttonGroupProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label?: string;
  errorLabel?: string;
  radionButtons: IRadiobuttonProps[];
}

type Props = IRadiobuttonGroupProps & IInjectedTeamsProps;

type CompState = {
  groupId: string;
  labelId: string;
};

class RadiobuttonGroupInner extends React.Component<Props, CompState> {

  state: CompState = {
    labelId: uniqueId('ts-rgl'),
    groupId: uniqueId('ts-rg'),
  };

  render() {
    const { context, children, className, label, errorLabel, ...rest } = this.props;
    const themeClassNames = radioButtonGroup(context);

    const hasLabel = !!label;
    const hasError = !!errorLabel;

    return (
      <div {...rest}>
        <label
          id={this.state.labelId}
          aria-live="polite"
          htmlFor={this.state.groupId}>
          {hasLabel ? <span className={themeClassNames.label}>{label}</span> : null}
          {hasError ? <span className={themeClassNames.errorLabel}>{errorLabel}</span> : null}
        </label>
        <div
          id={this.state.groupId}
          role="radiogroup"
          aria-labelledby={this.state.labelId}
          className={classes(themeClassNames.container, className)}
          aria-invalid={hasError}>
          {map(this.props.radionButtons, (r) => (
            <Radiobutton {...r} />
          ))}
        </div>
      </div>
    );
  }
}

export const RadiobuttonGroup = connectTeamsComponent(RadiobuttonGroupInner);
