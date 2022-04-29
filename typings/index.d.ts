declare module "voice-utility" {
    import { EventEmitter } from "events";
    import { Client, PermissionResolvable, User as DiscordUser, Snowflake, GuildMember, VoiceChannel, Guild } from "discord.js";

    export const version: string;
    export const author: string;
    export const license: string;

    export class VoiceManager extends EventEmitter {
        constructor(client: Client, options?: VoiceManagerOptions);

        public client: Client;
        public users: User[];
        public configs: Config[];
        public options: VoiceManagerOptions;
        public ready: boolean;

        public createUser(userId: Snowflake, guildId: Snowflake, options: UserOptions): Promise<User>;
        public createConfig(guildId: Snowflake, options: ConfigOptions): Promise<Config>;
        public removeUser(userId: Snowflake, guildId: Snowflake): Promise<void>;
        public removeConfig(guildId: Snowflake): Promise<void>;
        public updateUser(userId: Snowflake, guildId: Snowflake, options: UserEditOptions): Promise<User>;
        public updateConfig(guildId: Snowflake, options: ConfigEditOptions): Promise<Config>;

        public on<K extends keyof VoiceManagerEvents>(event: K, listener: (...args: VoiceManagerEvents[K]) => void): this;

        public once<K extends keyof VoiceManagerEvents>(event: K, listener: (...args: VoiceManagerEvents[K]) => void): this;

        public emit<K extends keyof VoiceManagerEvents>(event: K, ...args: VoiceManagerEvents[K]): boolean;
    }
    class User extends EventEmitter {
        constructor(manager: VoiceManager, options: UserData);

        public manager: VoiceManager;
        public client: Client;
        public userId: Snowflake;
        public guildId: Snowflake;
        public voiceTime: UserVoiceTimeOptions;
        public levelingData: UserLevelingOptions;
        public coinData: UserCoinOptions;
        public options: UserOptions;

        readonly guild: Guild;
        readonly user: DiscordUser;
        readonly channelAndMember: channelAndMemberOptions;
        readonly channel: VoiceChannel;
        readonly member: GuildMember;
        readonly data: UserData;

        public edit(options: UserEditOptions): Promise<User>;
    }
    class Config extends EventEmitter {
        constructor(manager: VoiceManager, options: ConfigData);

        public manager: VoiceManager;
        public guildId: Snowflake;
        public options: ConfigOptions;

        readonly trackBots: boolean;
        readonly trackMute: boolean;
        readonly trackDeaf: boolean;
        readonly trackAllChannels: boolean;
        readonly minUserCountToParticipate: number;
        readonly maxUserCountToParticipate: number;
        readonly minPointToParticipate: number;
        readonly minCoinToParticipate: number;
        readonly minXpToParticipate: number;
        readonly minLevelToParticipate: number;
        readonly maxPointToParticipate: number;
        readonly maxCoinToParticipate: number;
        readonly maxXpToParticipate: number;
        readonly maxLevelToParticipate: number;
        readonly voiceTimeTrackingEnabled: boolean;
        readonly levelingTrackingEnabled: boolean;
        readonly coinTrackingEnabled: boolean;
        readonly data: ConfigData;
        readonly exemptPermissions: PermissionResolvable[];
        readonly exemptMembersFunction: Function | null;
        readonly exemptChannelsFunction: Function | null;
        readonly pointAmountToAddFunction: Function | null;
        readonly xpAmountToAddFunction: Function | null;
        readonly voiceTimeToAddFunction: Function | null;

        public exemptMembers(member: GuildMember): Promise<boolean>;
        public exemptChannels(channel: VoiceChannel): Promise<boolean>;
        public pointAmountToAdd(): Promise<number>;
        public xpAmountToAdd(): Promise<number>;
        public voiceTimeToAdd(): Promise<number>;
        public edit(options: ConfigEditOptions): Promise<Config>;
    }
    interface VoiceManagerOptions {
        userStorage?: string;
        configStorage?: string;
        checkMembersEvery?: number;
        default?: ConfigOptions;
    }
    interface ConfigOptions {
        trackBots?: boolean;
        trackAllChannels?: boolean;
        exemptChannels?: Snowflake[]
        channelIds?: Snowflake[];
        exemptPermissions?: PermissionResolvable[];
        exemptMembers?: Snowflake[];
        trackMute?: boolean;
        trackDeaf?: boolean;
        minUserCountToParticipate?: number;
        maxUserCountToParticipate?: number;
        minPointToParticipate?: number;
        minCoinToParticipate?: number;
        minXpToParticipate?: number;
        minLevelToParticipate?: number;
        maxPointToParticipate?: number;
        maxCoinToParticipate?: number;
        maxXpToParticipate?: number;
        maxLevelToParticipate?: number;
        pointAmountToAdd?: () => number | Promise<number>;
        xpAmountToAdd?: () => number | Promise<number>;
        voiceTimeToAdd?: () => number | Promise<number>;
        voiceTimeTrackingEnabled?: boolean;
        levelingTrackingEnabled?: boolean;
        coinTrackingEnabled?: boolean;
        pointMultiplier?: () => number | Promise<number>;
        levelMultiplier?: () => number | Promise<number>;
    }
    interface ConfigData {
        guildId: Snowflake;
        trackBots: boolean;
        trackAllChannels: boolean;
        exemptChannels: Snowflake[]
        channelIds: Snowflake[];
        exemptPermissions: string[];
        exemptMembers: Snowflake[]
        trackMute: boolean;
        trackDeaf: boolean;
        minUserCountToParticipate: number;
        maxUserCountToParticipate: number;
        minPointToParticipate?: number;
        minCoinToParticipate?: number;
        minXpToParticipate: number;
        minLevelToParticipate: number;
        maxPointToParticipate?: number;
        maxCoinToParticipate?: number;
        maxXpToParticipate: number;
        maxLevelToParticipate: number;
        pointAmountToAdd?: () => number | Promise<number>;
        xpAmountToAdd: () => number | Promise<number>;
        voiceTimeToAdd: () => number | Promise<number>;
        voiceTimeTrackingEnabled: boolean;
        levelingTrackingEnabled: boolean;
        coinTrackingEnabled: boolean;
        pointMultiplier: () => number | Promise<number>;
        levelMultiplier: () => number | Promise<number>;
    }
    interface ConfigEditOptions {
        newTrackBots?: boolean;
        newTrackAllChannels?: boolean;
        newExemptChannels?: (channel?: VoiceChannel) => boolean | Promise<boolean>;
        newChannelIds?: Snowflake[];
        newExemptPermissions?: PermissionResolvable[];
        newExemptMembers?: (member?: GuildMember) => boolean | Promise<boolean>;
        newTrackMute?: boolean;
        newTrackDeaf?: boolean;
        newMinUserCountToParticipate?: number;
        newMaxUserCountToParticipate?: number;
        newMinPointToParticipate?: number;
        newMinCoinToParticipate?: number;
        newMinXpToParticipate?: number;
        newMinLevelToParticipate?: number;
        newMaxPointToParticipate?: number;
        newMaxCoinToParticipate?: number;
        newMaxXpToParticipate?: number;
        newMaxLevelToParticipate?: number;
        newPointAmountToAdd?: () => number | Promise<number>;
        newXpAmountToAdd?: () => number | Promise<number>;
        newVoiceTimeToAdd?: () => number | Promise<number>;
        newVoiceTimeTrackingEnabled?: boolean;
        newLevelingTrackingEnabled?: boolean;
        newCoinTrackingEnabled?: boolean;
        newPointMultiplier: () => number | Promise<number>;
        newLevelMultiplier: () => number | Promise<number>;
    }
    interface UserOptions {
        voiceTime: {
            channels: UserVoiceTimeChannelsOptions[];
            total: number;
        };
        levelingData: {
            xp: number;
            level: number;
        };
        coinData: {
            point: number;
            coin: number;
        }
    }
    interface UserVoiceTimeChannelsOptions {
        channelId: string;
        voiceTime: number;
    }
    interface UserVoiceTimeOptions {
        channels: UserVoiceTimeChannelsOptions[];
        total: number;
    }
    interface UserLevelingOptions {
        xp: number;
        level: number;
    }
    interface UserCoinOptions {
        point: number;
        coin: number;
    }
    interface UserData {
        userId: Snowflake;
        guildId: Snowflake;
        voiceTime: UserVoiceTimeOptions;
        levelingData: UserLevelingOptions;
        coinData: UserCoinOptions;
    }
    interface UserEditOptions {
        newVoiceTime?: UserVoiceTimeOptions;
        newLevelingData?: UserLevelingOptions;
        newCoinData?: UserCoinOptions;
    }
    interface channelAndMemberOptions {
        channel: VoiceChannel;
        member: GuildMember;
    }
    interface VoiceManagerEvents {
        userPointAdd: [User, User];
        userCoinAdd: [User, User];
        userXpAdd: [User, User];
        userLevelUp: [User, User];
        userVoiceTimeAdd: [User, User];
    }
}
