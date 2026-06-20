"use client";

import { useEffect, useRef } from "react";

export interface KeyState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  sprint: boolean;
  interact: boolean;
  ascend: boolean;
  descend: boolean;
  rollLeft: boolean;
  rollRight: boolean;
}

export function useKeyboardControls() {
  const keys = useRef<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    sprint: false,
    interact: false,
    ascend: false,
    descend: false,
    rollLeft: false,
    rollRight: false,
  });

  useEffect(() => {
    function onKey(e: KeyboardEvent, pressed: boolean) {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          keys.current.forward = pressed;
          break;
        case "KeyS":
        case "ArrowDown":
          keys.current.backward = pressed;
          break;
        case "KeyA":
        case "ArrowLeft":
          keys.current.left = pressed;
          break;
        case "KeyD":
        case "ArrowRight":
          keys.current.right = pressed;
          break;
        case "Space":
          keys.current.jump = pressed;
          keys.current.ascend = pressed;
          if (pressed) e.preventDefault();
          break;
        case "ControlLeft":
        case "ControlRight":
          keys.current.descend = pressed;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          keys.current.sprint = pressed;
          break;
        case "KeyQ":
          keys.current.rollLeft = pressed;
          break;
        case "KeyR":
          keys.current.rollRight = pressed;
          break;
        case "KeyE":
          keys.current.interact = pressed;
          break;
      }
    }

    const down = (e: KeyboardEvent) => onKey(e, true);
    const up = (e: KeyboardEvent) => onKey(e, false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return keys;
}
