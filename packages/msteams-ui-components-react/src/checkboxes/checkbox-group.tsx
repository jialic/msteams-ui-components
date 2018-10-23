import { checkboxGroup } from 'msteams-ui-styles-core/lib/components/checkbox-group';
import * as React from 'react';
import { connectTeamsComponent } from '../teams-context/connect-teams-component';
import classes from '../utils/classes';
import uniqueId from '../utils/uniqueId';
import { IInjectedTeamsProps } from '..';
import { ICheckboxProps, Checkbox } from './checkbox';
import { map } from 'lodash';

export interface ICheckboxGroupProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label?: string;
  errorLabel?: string;
  checkboxes: ICheckboxProps[];
}

type Props = ICheckboxGroupProps & IInjectedTeamsProps;

class CheckboxGroupInner extends React.Component<Props> {
  state = {
    labelId: uniqueId('ts-rgl'),
    groupId: uniqueId('ts-cg-'),
  };

  render() {
    const { context, className, label, errorLabel, checkboxes, ...rest } = this.props;
    const themeClassNames = checkboxGroup(context);
    const actualId = this.state.groupId;

    const hasLabel = !!label;
    const hasError = !!errorLabel;

    return (
      <div {...rest}>
        <label
          id={this.state.labelId}
          aria-live="polite">
          {hasLabel ? <span className={themeClassNames.label}>{label}</span> : null}
          {hasError ? <span className={themeClassNames.errorLabel}>{errorLabel}</span> : null}
        </label>
        <div
          id={actualId}
          role="group"
          aria-labelledby={this.state.labelId}
          className={classes(themeClassNames.container, className)}
          aria-invalid={hasError}
        >
          {map(checkboxes, (c) => (
            <Checkbox {...c} />
          ))}
        </div>
      </div>
    );
  }
}

export const CheckboxGroup = connectTeamsComponent(CheckboxGroupInner);
