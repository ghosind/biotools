'use client'

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, MenuItem, Select, Stack, TextField } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import Head from 'next/head';

export default function Concentration() {
  const [amountOfSubstance, setAmountOfSubstance] = useState<string>('');
  const [concentration, setConcentration] = useState<string>('');
  const [concentrationAmountType, setConcentrationAmountType] = useState<AmountType>('mol');
  const [concentrationVolumeType, setConcentrationVolumeType] = useState<VolumeType>('l');
  const [massConcentration, setMassConcentration] = useState<string>('');
  const [massConcentrationMassType, setMassConcentrationMassType] = useState<MassType>('kg');
  const [massConcentrationVolumeType, setMassConcentrationVolumeType] = useState<VolumeType>('l');

  const getConcentrationValue = (): number => {
    let value = Number(concentration);

    switch (concentrationAmountType) {
      case 'mmol':
        value /= 1000;
      case 'mol':
        break;
      default:
        throw new Error('物质的量浓度单位错误')
    }
    switch (concentrationVolumeType) {
      case 'ul':
        value *= 1000;
      case 'ml':
        value *= 1000;
      case 'l':
        break;
      default:
        throw new Error('物质的量浓度单位错误');
    }

    return value;
  }

  const setConcentrationValue = (value: number) => {
    switch (concentrationAmountType) {
      case 'mmol':
        value *= 1000;
      case 'mol':
        break;
      default:
        throw new Error('物质的量浓度单位错误')
    }
    switch (concentrationVolumeType) {
      case 'ul':
        value /= 1000;
      case 'ml':
        value /= 1000;
      case 'l':
        break;
      default:
        throw new Error('物质的量浓度单位错误');
    }

    setConcentration(value.toFixed(4));
  }

  const getMassConcentrationValue = (): number => {
    let value = Number(massConcentration);

    switch (massConcentrationMassType) {
      case 'ug':
        value /= 1000;
      case 'mg':
        value /= 1000;
      case 'g':
        break;
      case 'kg':
        value *= 1000;
        break;
      default:
        throw new Error('浓度单位错误')
    }
    switch (massConcentrationVolumeType) {
      case 'ul':
        value *= 1000;
      case 'ml':
        value *= 1000;
      case 'l':
        break;
      default:
        throw new Error('浓度单位错误');
    }

    return value;
  }

  const setMassConcentrationValue = (value: number) => {
    switch (massConcentrationMassType) {
      case 'ug':
        value *= 1000;
      case 'mg':
        value *= 1000;
      case 'g':
        break;
      case 'kg':
        value /= 1000;
        break;
      default:
        throw new Error('浓度单位错误')
    }
    switch (massConcentrationVolumeType) {
      case 'ul':
        value /= 1000;
      case 'ml':
        value /= 1000;
      case 'l':
        break;
      default:
        throw new Error('浓度单位错误');
    }

    setMassConcentration(value.toFixed(4));
  }

  const calculate = () => {
    try {
      if (!amountOfSubstance) {
        throw new Error('物质的量必须填写');
      }
      if (!concentration && !massConcentration) {
        throw new Error('浓度或物质的量浓度其中必须填写一个');
      }

      if (concentration) {
        const value = getConcentrationValue() / Number(amountOfSubstance);
        setMassConcentrationValue(value);
      } else {
        const value = getMassConcentrationValue() / Number(amountOfSubstance);
        setConcentrationValue(value);
      }
    } catch (err) {
      alert(err);
    }
  };

  const reset = () => {
    setAmountOfSubstance('');
    setConcentration('');
    setMassConcentration('');
  };

  return (
    <Container maxWidth='lg'>
      <Box sx={{width: '100%'}}>
        <Stack spacing={1}>
          <Box>
            <TextField
              fullWidth
              key='amount-of-substance'
              type='number'
              label='物质的量'
              value={amountOfSubstance}
              onChange={(event: React.ChangeEvent<{value: string}>) =>
                setAmountOfSubstance(event.target.value)
              }
            />
          </Box>
          <Box>
            <Stack direction='row' spacing={1}>
              <TextField
                style={{width:'100%'}}
                key='concentration'
                type='number'
                label='物质的量浓度'
                value={concentration}
                onChange={(event: React.ChangeEvent<{value: string}>) =>
                  setConcentration(event.target.value)
                }
              />
              <Select
                style={{minWidth:90}}
                key='concentration-amount-type'
                value={concentrationAmountType}
                onChange={(event: SelectChangeEvent) =>
                  setConcentrationAmountType(event.target.value as AmountType)
                }
              >
                <MenuItem value='mol'>mol</MenuItem>
                <MenuItem value='mmol'>mmol</MenuItem>
              </Select>
              <Select
                style={{minWidth:65}}
                key='concentration-volume-type'
                value={concentrationVolumeType}
                onChange={(event: SelectChangeEvent) =>
                  setConcentrationVolumeType(event.target.value as VolumeType)
                }
              >
                <MenuItem value='l'>l</MenuItem>
                <MenuItem value='ml'>ml</MenuItem>
                <MenuItem value='ul'>ul</MenuItem>
              </Select>
            </Stack>
          </Box>
          <Box>
            <Stack direction='row' spacing={1}>
              <TextField
                style={{width:'100%'}}
                key='mass-concentration'
                type='number'
                label='浓度'
                value={massConcentration}
                onChange={(event: React.ChangeEvent<{value: string}>) =>
                  setMassConcentration(event.target.value)
                }
              />
              <Select
                style={{minWidth:90}}
                key='mass-concentration-mass-type'
                value={massConcentrationMassType}
                onChange={(event: SelectChangeEvent) =>
                  setMassConcentrationMassType(event.target.value as MassType)
                }
              >
                <MenuItem value='kg'>kg</MenuItem>
                <MenuItem value='g'>g</MenuItem>
                <MenuItem value='mg'>mg</MenuItem>
                <MenuItem value='ug'>ug</MenuItem>
              </Select>
              <Select
                style={{minWidth:65}}
                key='mass-concentration-volume-type'
                value={massConcentrationVolumeType}
                onChange={(event: SelectChangeEvent) =>
                  setMassConcentrationVolumeType(event.target.value as VolumeType)
                }
              >
                <MenuItem value='l'>l</MenuItem>
                <MenuItem value='ml'>ml</MenuItem>
                <MenuItem value='ul'>ul</MenuItem>
              </Select>
            </Stack>
          </Box>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Stack spacing={2} direction='row'>
              <Button variant='contained' onClick={calculate}>计算</Button>
              <Button variant='contained' onClick={reset}>重置</Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
