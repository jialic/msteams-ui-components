import { radioButton } from 'msteams-ui-styles-core/lib/components/radio-button';
import * as React from 'react';
import { connectTeamsComponent, IInjectedTeamsProps } from '../index';
import classes from '../utils/classes';
import uniqueId from '../utils/uniqueId';

export interface IRadiobuttonProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  selected?: boolean;
  label?: string;
  onToggle?: (selected: boolean) => void;
}

interface IRadiobuttonState {
  id: string;
  labelId: string;
}

type Props = IRadiobuttonProps & IInjectedTeamsProps;

class RadiobuttonInner extends React.Component<Props, IRadiobuttonState> {
  state: IRadiobuttonState = {
    id: uniqueId('ts-rb-'),
    labelId: uniqueId('ts-rbl-'),
  };

  render() {
    const { id, required, name, context, className, style, value, label, selected, ...rest } = this.props;

    const themeClassNames = radioButton(context);

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
          type="radio"
          aria-labelledby={this.state.labelId}
          aria-required={required}
          aria-checked={selected}
          checked={selected}
          onChange={this.onChange}
          readOnly
          {...rest} />
        <span aria-hidden className={themeClassNames.radio}></span>
      </label>
    );
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onToggle) {
      this.props.onToggle(e.target.checked);
    }
  }
}

export const Radiobutton = connectTeamsComponent(RadiobuttonInner);
