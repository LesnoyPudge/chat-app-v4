import { ASSETS } from '@generated/ASSETS';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { getAssetUrl } from '@utils';
import { Howl, Howler } from 'howler';

// - кулдаун на звуки уведомлений в SoundManager

const SOUNDS = ASSETS.SOUNDS;

type SoundAssets = typeof SOUNDS;

type AssetItem = T.ValueOf<SoundAssets>;

const DEFAULT_VOLUME = 0.5;

const sounds = {
    [SOUNDS.DISCORD_CALL.NAME]: new Howl({
        src: getAssetUrl(SOUNDS.DISCORD_CALL),
        volume: DEFAULT_VOLUME,
        html5: true,
        loop: true,
    }),
    [SOUNDS.DISCORD_DEAFEN.NAME]: new Howl({
        src: getAssetUrl(SOUNDS.DISCORD_DEAFEN),
        volume: DEFAULT_VOLUME,
        html5: false,
        loop: false,
    }),
    [SOUNDS.DISCORD_MUTE.NAME]: new Howl({
        src: getAssetUrl(SOUNDS.DISCORD_MUTE),
        volume: DEFAULT_VOLUME,
        html5: false,
        loop: false,
    }),
    [SOUNDS.DISCORD_NOTIFICATION.NAME]: new Howl({
        src: getAssetUrl(SOUNDS.DISCORD_NOTIFICATION),
        volume: DEFAULT_VOLUME,
        html5: false,
        loop: false,
    }),
    [SOUNDS.DISCORD_OUTGOING_CALL.NAME]: new Howl({
        src: getAssetUrl(SOUNDS.DISCORD_OUTGOING_CALL),
        volume: DEFAULT_VOLUME,
        html5: true,
        loop: true,
    }),
    [SOUNDS.DISCORD_UNDEAFEN.NAME]: new Howl({
        src: getAssetUrl(SOUNDS.DISCORD_UNDEAFEN),
        volume: DEFAULT_VOLUME,
        html5: false,
        loop: false,
    }),
    [SOUNDS.DISCORD_UNMUTE.NAME]: new Howl({
        src: getAssetUrl(SOUNDS.DISCORD_UNMUTE),
        volume: DEFAULT_VOLUME,
        html5: false,
        loop: false,
    }),
} satisfies Record<AssetItem['NAME'], Howl>;

class SoundManager {
    constructor() {}
}

export const soundManager = new SoundManager();