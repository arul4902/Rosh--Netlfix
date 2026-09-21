"use client";
import {useEffect, useRef, useState} from 'react';

export function useMemoryMusic(sound: boolean, filmPlaying: boolean, volume: number) {
  const background = useRef<HTMLAudioElement>(null);
  const personal = useRef<HTMLAudioElement>(null);
  const [enabled, setEnabled] = useState(true);
  const [personalPlaying, setPersonalPlaying] = useState(false);
  const [ambient, setAmbient] = useState(false);
  const [error, setError] = useState('');

  function start() {
    setEnabled(true);
    setError('');
    if (!personalPlaying && !filmPlaying) {
      // Called directly from the entrance button to preserve the user gesture.
      const player = background.current;
      if (player) { player.muted = false; void player.play().catch(() => {}); }
    }
  }

  useEffect(() => {
    const player = background.current;
    if (!player) return;
    player.volume = volume;
    player.muted = !sound;
    if (personal.current) personal.current.muted = !sound;
    if (!sound || filmPlaying) personal.current?.pause();
    if (sound && enabled && !personalPlaying && !filmPlaying) {
      // Autoplay rejection is normal; Enter with sound retries with a gesture.
      void player.play().catch(() => {});
    } else player.pause();
  }, [sound, enabled, personalPlaying, filmPlaying, volume]);

  useEffect(() => {
    const player = background.current;
    return () => { player?.pause(); };
  }, []);

  return {background, personal, enabled, setEnabled, personalPlaying, setPersonalPlaying,
    ambient, setAmbient, error, setError, start};
}
