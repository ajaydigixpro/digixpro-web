import path from 'path';
import fs from 'fs';
import { ApprovedAudioTrack } from './types';

export function getApprovedAudioTrack(preferredTrackId?: string): ApprovedAudioTrack {
  const registryPath = path.resolve('C:/Users/shukl/digixpro-office/digixpro-web/src/visual-engine/registry/audio-registry.json');
  if (!fs.existsSync(registryPath)) {
    throw new Error('Audio registry not found at: ' + registryPath);
  }

  const registry: Record<string, ApprovedAudioTrack> = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const approvedTracks = Object.values(registry).filter((t) => t.approved);

  if (approvedTracks.length === 0) {
    throw new Error('No approved audio tracks found in audio-registry.json');
  }

  if (preferredTrackId && registry[preferredTrackId] && registry[preferredTrackId].approved) {
    const track = registry[preferredTrackId];
    track.file_path = path.resolve('C:/Users/shukl/digixpro-office/digixpro-web', track.file_path);
    return track;
  }

  const selected = approvedTracks[0];
  selected.file_path = path.resolve('C:/Users/shukl/digixpro-office/digixpro-web', selected.file_path);
  return selected;
}
