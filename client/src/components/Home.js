import React, { useState } from "react";
import axios from "axios";

export default function Home({ setPlayerName, playerName, handleSubmit }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="name">Player name:</label>
        <input
          value={playerName}
          onChange={handleChange}
          type="text"
          id="name"
          name="name"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
