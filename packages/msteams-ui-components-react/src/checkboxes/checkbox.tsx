import { checkbox } from 'msteams-ui-styles-core/lib/components/checkbox';
import * as React from 'react';
import { connectTeamsComponent, IInjectedTeamsProps } from '../index';
import classes from '../utils/classes';
import uniqueId from '../utils/uniqueId';

export interface ICheckboxProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
}

interface ICheckboxState {
  id: string;
  labelId: string;
}

type Props = IInjectedTeamsProps & ICheckboxProps;

class CheckboxInner extends React.Component<Props, ICheckboxState> {
  state: ICheckboxState = {
    id: uniqueId('ts-cb-'),
    labelId: uniqueId('ts-cbl-'),
  };

  render() {
    const { id, required, name, context, className, style, value, checked, onChange, label, ...rest } = this.props;

    const themeClassNames = checkbox(context);

    return (
      <label
        id={this.state.id}
        className={classes(themeClassNames.container, className)}
        style={style}>
        <span
          id={this.state.labelId}
          aria-hidden
          className={themeClassNames.label}>{label}</span>
        <input
          id={id}
          name={name}
          type="checkbox"
          aria-labelledby={this.state.labelId}
          aria-required={required}
          aria-checked={checked}
          checked={checked}
          onChange={this.onChange}
          required={required}
          readOnly
          {...rest} />
        <span aria-hidden className={themeClassNames.checkbox}></span>
      </label>
    );
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onToggle) {
      this.props.onToggle(e.target.checked);
    }
  }
}

export const Checkbox = connectTeamsComponent(CheckboxInner);
