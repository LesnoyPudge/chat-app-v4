import { ASSETS } from '@/generated/ASSETS';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { getAssetUrl } from '@/utils';
import { Howl } from 'howler';



type SoundAssets = typeof SOUNDS;
type AssetItem = T.ValueOf<SoundAssets>;
type AssetNames = AssetItem['NAME'];

type ConfiguredSoundOptions = {
    throttleDelay: number | null;
    isBlockable: boolean;
    isBlocking: boolean;
    interruptedBy: AssetNames[] | null;
};

type ConfiguredSoundOptionRecord = Record<
    AssetNames,
    ConfiguredSoundOptions
>;

type ConfiguredSounds = {
    [_Name in AssetNames]: T.Simplify<(
        ConfiguredSoundOptions
        & {
            name: _Name;
            api: Howl;
        }
    )>
};

type Timeouts = Record<AssetNames, {
    isThrottling: boolean;
    id: number | undefined;
}>;

const SOUNDS = ASSETS.SOUNDS;
const DEFAULT_VOLUME = 0.3;
const DEFAULT_FADE_DURATION = 100;

const createConfiguredSounds = (
    optionTable: ConfiguredSoundOptionRecord,
): ConfiguredSounds => {
    const soundApis = {
        [SOUNDS.DISCORD_INCOMING_CALL.NAME]: new Howl({
            src: getAssetUrl(SOUNDS.DISCORD_INCOMING_CALL),
            volume: DEFAULT_VOLUME,
            loop: true,
        }),
        [SOUNDS.DISCORD_DEAFEN.NAME]: new Howl({
            src: getAssetUrl(SOUNDS.DISCORD_DEAFEN),
            volume: DEFAULT_VOLUME,
            loop: false,
        }),
        [SOUNDS.DISCORD_MUTE.NAME]: new Howl({
            src: getAssetUrl(SOUNDS.DISCORD_MUTE),
            volume: DEFAULT_VOLUME,
            loop: false,
        }),
        [SOUNDS.DISCORD_NOTIFICATION.NAME]: new Howl({
            src: getAssetUrl(SOUNDS.DISCORD_NOTIFICATION),
            volume: DEFAULT_VOLUME,
            loop: false,
        }),
        [SOUNDS.DISCORD_OUTGOING_CALL.NAME]: new Howl({
            src: getAssetUrl(SOUNDS.DISCORD_OUTGOING_CALL),
            volume: DEFAULT_VOLUME,
            loop: true,
        }),
        [SOUNDS.DISCORD_UNDEAFEN.NAME]: new Howl({
            src: getAssetUrl(SOUNDS.DISCORD_UNDEAFEN),
            volume: DEFAULT_VOLUME,
            loop: false,
        }),
        [SOUNDS.DISCORD_UNMUTE.NAME]: new Howl({
            src: getAssetUrl(SOUNDS.DISCORD_UNMUTE),
            volume: DEFAULT_VOLUME,
            loop: false,
        }),
    } satisfies Record<AssetItem['NAME'], Howl>;

    return (
        Object.keys<typeof optionTable>(optionTable)
            .reduce<ConfiguredSounds>(<
                _Name extends keyof ConfiguredSounds,
            >(acc: ConfiguredSounds, name: _Name) => {
                const options = optionTable[name];

                const sound = {
                    ...options,
                    api: soundApis[name],
                    name,
                } as ConfiguredSounds[_Name];

                acc[name] = sound;

                return acc;
            }, {})
    );
};

const lazyCreateConfiguredSounds = () => {
    return createConfiguredSounds({
        [SOUNDS.DISCORD_INCOMING_CALL.NAME]: {
            throttleDelay: null,
            isBlockable: true,
            isBlocking: true,
            interruptedBy: null,
        },
        [SOUNDS.DISCORD_DEAFEN.NAME]: {
            throttleDelay: null,
            isBlockable: false,
            isBlocking: false,
            interruptedBy: [SOUNDS.DISCORD_UNDEAFEN.NAME],
        },
        [SOUNDS.DISCORD_MUTE.NAME]: {
            throttleDelay: null,
            isBlockable: false,
            isBlocking: false,
            interruptedBy: [SOUNDS.DISCORD_UNMUTE.NAME],
        },
        [SOUNDS.DISCORD_NOTIFICATION.NAME]: {
            throttleDelay: 3_000,
            isBlockable: false,
            isBlocking: false,
            interruptedBy: null,
        },
        [SOUNDS.DISCORD_OUTGOING_CALL.NAME]: {
            throttleDelay: null,
            isBlockable: true,
            isBlocking: true,
            interruptedBy: null,
        },
        [SOUNDS.DISCORD_UNDEAFEN.NAME]: {
            throttleDelay: null,
            isBlockable: false,
            isBlocking: false,
            interruptedBy: [SOUNDS.DISCORD_DEAFEN.NAME],
        },
        [SOUNDS.DISCORD_UNMUTE.NAME]: {
            throttleDelay: null,
            isBlockable: false,
            isBlocking: false,
            interruptedBy: [SOUNDS.DISCORD_MUTE.NAME],
        },
    });
};

const getConfiguredSounds = (() => {
    let configuredSounds: ConfiguredSounds;

    return () => {
        if (configuredSounds) return configuredSounds;

        configuredSounds = lazyCreateConfiguredSounds();

        return configuredSounds;
    };
})();

const timeoutIds = (
    Object.keys<typeof SOUNDS>(SOUNDS)
        .reduce<Timeouts>((acc, cur) => {
            acc[cur] = {
                isThrottling: false,
                id: undefined,
            };

            return acc;
        }, {})
);

const currentlyPlayingSounds = new Set<AssetNames>();

const stop = (item: AssetItem) => {
    const configuredSounds = getConfiguredSounds();
    const sound = configuredSounds[item.NAME];
    if (!currentlyPlayingSounds.has(sound.name)) return;

    currentlyPlayingSounds.delete(sound.name);

    sound.api.stop();
    // sound.api.fade(sound.api.volume(), 0, 1_000);

    if (sound.throttleDelay === null) return;

    const timeout = timeoutIds[item.NAME];

    clearTimeout(timeout.id);

    timeout.isThrottling = true;

    timeout.id = setTimeout(() => {
        timeout.isThrottling = false;
    }, sound.throttleDelay);
};

const play = (item: AssetItem) => {
    const configuredSounds = getConfiguredSounds();
    const currentSound = configuredSounds[item.NAME];

    if (currentlyPlayingSounds.has(currentSound.name)) return;
    if (timeoutIds[item.NAME].isThrottling) return;

    const currentSounds = [
        ...currentlyPlayingSounds.values(),
    ].map((name) => {
        return configuredSounds[name];
    });

    const hasBlocking = currentSounds.some((sound) => sound.isBlocking);
    if (currentSound.isBlockable && hasBlocking) return;

    const soundsToInterrupt = currentSounds.filter((sound) => {
        return sound.interruptedBy?.includes(currentSound.name);
    });

    soundsToInterrupt.forEach((sound) => {
        stop(SOUNDS[sound.name]);
    });

    currentlyPlayingSounds.add(currentSound.name);

    currentSound.api.play();

    currentSound.api.once('end', () => {
        if (currentSound.api.loop()) return;

        stop(item);
    });
};

export const soundManager = {
    play,
    stop,
};



// const { SOUNDS } = ASSETS;

// type SoundConfig = {
//     src: string;
//     volume: number;
//     loop: boolean;
//     throttleDelay: number | null;
//     isBlockable: boolean;
//     isBlocking: boolean;
//     interruptedBy: string[];
// };

// type SoundAssets = typeof SOUNDS;
// type SoundAsset = T.ValueOf<SoundAssets>;
// // type SoundName = SoundAsset['NAME'];

// type SoundItemOptions = {
//     asset: SoundAsset;
//     volume: number;
//     loop: boolean;
//     throttleDelay: number | null;
//     isBlockable: boolean;
//     isBlocking: boolean;
//     interruptedBy: string[];
// };

// class SoundItem {
//     id: string;
//     src: string;
//     volume: number;
//     loop: boolean;
//     throttleDelay: number | null;
//     isBlockable: boolean;
//     isBlocking: boolean;
//     interruptedBy: string[];
//     timeoutId: number | undefined;
//     api: Howl | undefined;

//     constructor(options: SoundItemOptions) {
//         this.id = options.asset.NAME;
//         this.src = getAssetUrl(options.asset);
//         this.volume = options.volume;
//         this.loop = options.loop;
//         this.throttleDelay = options.throttleDelay;
//         this.isBlockable = options.isBlockable;
//         this.isBlocking = options.isBlocking;
//         this.interruptedBy = options.interruptedBy;

//         autoBind(this);
//     }

//     getApi() {
//         if (this.api) return this.api;

//         this.api = new Howl({
//             src: this.src,
//             volume: this.volume,
//             loop: this.loop,
//         });

//         return this.api;
//     }

//     play() {
//         const isThrottling = this.timeoutId !== undefined;
//         if (isThrottling) return;

//         const api = this.getApi();

//         api.play();

//         api.once('end', () => {
//             if (this.throttleDelay === null) return;

//             this.timeoutId = setTimeout(() => {
//                 this.timeoutId = undefined;
//             }, this.throttleDelay);
//         });
//     }

//     stop() {
//         this.getApi().stop();
//     }
// }

// const soundConfigs = {
//     [SOUNDS.DISCORD_DEAFEN.NAME]: {
//         src: getAssetUrl(SOUNDS.DISCORD_INCOMING_CALL),
//         volume: DEFAULT_VOLUME,
//         loop: true,
//         throttleDelay: null,
//         isBlockable: false,
//         isBlocking: false,
//         interruptedBy: [SOUNDS.DISCORD_UNDEAFEN.NAME],
//     },
// } satisfies Record<string, SoundConfig>;

// class SoundManager {
//     constructor() {}
// }

// export const soundManager2 = new SoundManager();