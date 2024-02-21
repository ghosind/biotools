'use client'

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, MenuItem, Select, Stack, TextField } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

export default function Concentration() {
  const [amountOfSubstance, setAmountOfSubstance] = useState<string>('');
  const [mass, setMass] = useState<string>('');
  const [massType, setMassType] = useState<MassType>('kg');
  const [concentration, setConcentration] = useState<string>('');
  const [concentrationAmountType, setConcentrationAmountType] = useState<AmountType>('mol');
  const [concentrationVolumeType, setConcentrationVolumeType] = useState<VolumeType>('l');
  const [volume, setVolume] = useState<string>('');
  const [volumeType, setVolumeType] = useState<VolumeType>('l');

  const getMassValue = (): number => {
    let value = Number(mass);

    switch (massType) {
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
        throw new Error('质量单位错误')
    }

    return value;
  }

  const setMassValue = (value: number) => {
    switch (massType) {
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
        throw new Error('质量单位错误')
    }

    setMass(value.toFixed(4));
  }

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

  const getVolumeValue = (): number => {
    let value = Number(volume);

    switch (volumeType) {
      case 'ul':
        value /= 1000;
      case 'ml':
        value /= 1000;
      case 'l':
        break;
      default:
        throw new Error('体积单位错误');
    }

    return value;
  }

  const setVolumeValue = (value: number) => {
    switch (volumeType) {
      case 'ul':
        value *= 1000;
      case 'ml':
        value *= 1000;
      case 'l':
        break;
      default:
        throw new Error('体积单位错误');
    }

    setVolume(value.toFixed(4));
  }

  const calculateAmountOfSubstance = () => {
    const concentration = getConcentrationValue();
    const mass = getMassValue();
    const volume = getVolumeValue();

    const value = mass / concentration / volume;

    setAmountOfSubstance(value.toFixed(4));
  }

  const calculateMass = () => {
    const concentration = getConcentrationValue();
    const volume = getVolumeValue();

    const mass = Number(amountOfSubstance) * concentration * volume;

    setMassValue(mass);
  }

  const calculateConcentration = () => {
    const mass = getMassValue();
    const volume = getVolumeValue();

    const concentration = mass / Number(amountOfSubstance) / volume;

    setConcentrationValue(concentration);
  }

  const calculateVolume = () => {
    const concentration = getConcentrationValue();
    const mass = getMassValue();

    const volume = mass / concentration / Number(amountOfSubstance);

    setVolumeValue(volume);
  }

  const calculate = () => {
    try {
      const fields: { value: string, handler: Function }[] = [
        { value: amountOfSubstance, handler: calculateAmountOfSubstance },
        { value: mass, handler: calculateMass },
        { value: concentration, handler: calculateConcentration },
        { value: volume, handler: calculateVolume },
      ];
      let handler: Function | null = null;
      let empty = 0;

      for (let field of fields) {
        if (!field.value) {
          handler = field.handler;
          empty++;
        }
      }
      if (empty > 1) {
        throw new Error('需要计算的值不能大于一个');
      }

      (handler || calculateMass)();
    } catch (err) {
      alert(err);
    }
  };

  const reset = () => {
    setAmountOfSubstance('');
    setMass('');
    setConcentration('');
    setVolume('');
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
                key='mass'
                type='number'
                label='质量'
                value={mass}
                onChange={(event: React.ChangeEvent<{value: string}>) =>
                  setMass(event.target.value)
                }
              />
              <Select
                style={{minWidth:90}}
                key='mass-type'
                value={massType}
                onChange={(event: SelectChangeEvent) =>
                  setMassType(event.target.value as MassType)
                }
              >
                <MenuItem value='kg'>kg</MenuItem>
                <MenuItem value='g'>g</MenuItem>
                <MenuItem value='mg'>mg</MenuItem>
                <MenuItem value='ug'>ug</MenuItem>
              </Select>
            </Stack>
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
                key='volume'
                type='number'
                label='体积'
                value={volume}
                onChange={(event: React.ChangeEvent<{value: string}>) =>
                  setVolume(event.target.value)
                }
              />
              <Select
                style={{minWidth:65}}
                key='volume-type'
                value={volumeType}
                onChange={(event: SelectChangeEvent) =>
                  setVolumeType(event.target.value as VolumeType)
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
