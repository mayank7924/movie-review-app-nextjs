import React from 'react'
import { alpha, styled } from '@mui/material/styles';
import MuiButton from "@mui/material/Button";

const CustomButton = styled(MuiButton)(({theme, size}) => ({
    borderRadius: 0,
    padding: theme.spacing(2, 4),
    fontSize: theme.typography.pxToRem(24),
    boxShadow: 'none',
    '&:active, &:focus, &:hover': {
        boxShadow: 'none',
    },
}))

export default function Button(props) {
  return <CustomButton {...props}/>
}
