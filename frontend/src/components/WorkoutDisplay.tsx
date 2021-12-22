import { Text, Stack } from '@chakra-ui/layout';
import * as React from 'react';
import { useActiveWorkout } from '../context/WorkoutContext';
import { Workout } from '../types';
import * as utils from '../utils';

export const WorkoutDisplay = () => {
  const { activeWorkout, activeFTP } = useActiveWorkout();
  if (!activeWorkout.workout) {
    return null;
  }

  const { activePart, isDone, partElapsedTime, workout } = activeWorkout;
  const formattedElapsedTime = utils.formatMinutesAndSecondsAsString(
    utils.secondsToMinutesAndSeconds(partElapsedTime)
  );

  return (
    <Stack fontSize="sm">
      <Text>{workout.name}</Text>
      <Text>Based on {activeFTP}W FTP</Text>
      <Text>{formattedElapsedTime}</Text>
      {workout.parts.map((part, i) => {
        const isActive = !isDone && i === activePart;
        return (
          <Text
            key={i}
            fontWeight={isActive ? 'bold' : 'normal'}
            color={isActive ? 'purple.500' : ''}
          >
            {`${utils.formatMinutesAndSecondsAsString(
              utils.secondsToMinutesAndSeconds(part.duration)
            )}@${part.targetPower}% (${utils.wattFromFtpPercent(
              part.targetPower,
              activeFTP
            )}W)`}
          </Text>
        );
      })}
      {isDone ? (
        <Text>DONE!</Text>
      ) : (
        <Text>{getTimeLeft(workout, partElapsedTime, activePart)}</Text>
      )}
    </Stack>
  );
};

const getTimeLeft = (
  workout: Workout,
  partElapsedTime: number,
  activePart: number
): string => {
  const totalWorkoutTime = workout.parts.reduce(
    (acc, part) => acc + part.duration,
    0
  );

  const timeElapsed =
    partElapsedTime +
    workout.parts.reduce(
      (acc, part, ind) => (ind < activePart ? acc + part.duration : acc),
      0
    );

  return utils.formatMinutesAndSecondsAsString(
    utils.secondsToMinutesAndSeconds(totalWorkoutTime - timeElapsed)
  );
};
