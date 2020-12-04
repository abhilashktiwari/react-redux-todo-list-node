import styled from '@emotion/styled'
import { Button, Grid } from '@material-ui/core'

export const StyledButton = styled(
    (props) => `
    color: ${props.isactive === 'true' ? 'blue' : 'black'};
    margin: 4px;
`);
