import * as PropTypes from 'prop-types';
import { IContext } from '.';

export const ContextProps = {
  subscribe: PropTypes.func.isRequired,
};

export interface IInjectedTeamsProps {
  readonly context: IContext;
}

