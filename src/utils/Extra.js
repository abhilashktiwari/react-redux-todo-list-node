import styled from '@emotion/styled'

export const StyledButton = styled(
    (props) => `
    color: ${props.isactive === 'true' ? 'blue' : 'black'};
    margin: 4px;
`);
