import React, { useCallback, useEffect, useRef, useState } from 'react';

import { combineStyles, isNumber, toDigit } from './utils';

export type DraggableInputChangeHandler = (value: number, input: HTMLInputElement | null) => void;

interface UniqueDraggableInputProps {
  onChange?: DraggableInputChangeHandler;
  onInput?: DraggableInputChangeHandler;
  value: number;
  /**
   * Amount value changes on drag
   */
  step?: number;
  /**
   * Number of pixels while dragging before adding `step` to value
   */
  pixelsPerStep?: number;
  min?: number;
  max?: number;
}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof UniqueDraggableInputProps> &
  UniqueDraggableInputProps;

export const DraggableInput = ({
  value: _value,
  style: _style = {},
  onChange,
  onInput,
  pixelsPerStep: pixelsPerStepProp,
  ...props
}: InputProps) => {
  // props
  const step = isNumber(props.step) ? props.step : 1;
  const pixelsPerStep = isNumber(pixelsPerStepProp) ? pixelsPerStepProp : 1;
  const { min, max } = props;
  // state
  const [value, setValue] = useState<number | string>('');
  const startValue = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [, setStartPos] = useState<[number, number]>([0, 0]);
  // style
  const style = combineStyles({ cursor: 'ew-resize', userSelect: 'none' }, _style);
  // generic handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // sanitize input
    let newValue = '';
    for (const char of e.target.value) {
      const asDigit = toDigit(char);
      if (asDigit !== undefined) {
        newValue += asDigit;
      }
    }
    const numberValue = parseInt(newValue);
    setValue(newValue);
    if (isNaN(numberValue)) {
      return;
    }
    onChange?.(+numberValue, inputRef.current);
  };
  const handleDragStart = useCallback(
    (newStartPos: [number, number]) => {
      let _startValue = +value;
      if (isNaN(_startValue)) {
        _startValue = +(props.defaultValue || props.min || 0);
      }
      startValue.current = _startValue;
      setStartPos(newStartPos);
    },
    [value, props.defaultValue, props.min],
  );
  const handleMove = useCallback(
    ([curMouseX, curMouseY]: [number, number]) => {
      setStartPos((pos) => {
        const [startMouseX, startMouseY] = pos;
        const mouseDiffX = curMouseX - startMouseX;
        const mouseDiffY = -1 * (curMouseY - startMouseY); // -1 to make "up" make value larger
        const stepsX = mouseDiffX / pixelsPerStep;
        const stepsY = mouseDiffY / pixelsPerStep;
        const steps = stepsX + stepsY;
        const delta = Math.round(steps) * step;
        let newValue = startValue.current + delta;
        if (min) newValue = Math.max(newValue, min);
        if (max) newValue = Math.min(newValue, max);
        setValue(newValue);
        onInput?.(newValue, inputRef.current);
        onChange?.(newValue, inputRef.current);
        return pos;
      });
    },
    [max, min, pixelsPerStep, step, onInput, onChange],
  );
  // mouse event (desktop) handlers
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleMove([e.clientX, e.clientY]);
    },
    [handleMove],
  );
  const handleMouseMoveEnd = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseMoveEnd);
  }, [handleMouseMove]);
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      handleDragStart([e.clientX, e.clientY]);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseMoveEnd);
    },
    [handleMouseMove, handleMouseMoveEnd, handleDragStart],
  );
  // touch event (mobile) handlers
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      handleMove([touch.clientX, touch.clientY]);
    },
    [handleMove],
  );
  const handleTouchEnd = useCallback(() => {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchMove]);
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLInputElement>) => {
      handleDragStart([e.touches[0].clientX, e.touches[0].clientY]);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    [handleDragStart, handleTouchMove, handleTouchEnd],
  );
  // ensure updates to value (including initial) set our internal value tracking state
  useEffect(() => {
    if (_value) {
      setValue(+_value);
    }
  }, [_value]);
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseMoveEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <input
      type="number"
      className="draggable-input"
      {...props}
      value={value}
      style={style}
      onChange={handleChange}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      ref={inputRef}
    />
  );
};
