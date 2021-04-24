import React, { useRef, useEffect, useState, useMemo, useContext } from "react";

export default function WelcomePage() {
  const input = useRef();
  return (
    <div>
      <input ref={input} id="player-name" type="text"></input>

      <button
        onClick={() => {
          alert(input.current.value);
        }}
      >
        START GAME
      </button>
    </div>
  );
}
