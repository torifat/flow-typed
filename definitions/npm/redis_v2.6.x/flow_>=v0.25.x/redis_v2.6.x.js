declare module 'redis' {

  declare type Option = {
    host?: string,
    port?:	number,
    path?:	?string,
    url?: ?string,
    parser?: Object, // Deprecated
    string_numbers?: ?boolean,
    return_buffers?: ?boolean,
    detect_buffers?: ?boolean,
    socket_keepalive?: ?boolean,
    no_ready_check?: ?boolean,
    enable_offline_queue?: ?boolean,
    retry_max_delay?: ?number, // Deprecated
    connect_timeout?: ?number, // Deprecated
    max_attempts?: ?number, // Deprecated
    retry_unfulfilled_commands?: ?boolean,
    password?: ?string,
    db?: ?string,
    family?: ?string,
    disable_resubscribing?: ?boolean,
    rename_commands?: ?Object,
    tls?: ?Object,
    prefix?: ?string,
    retry_strategy?: ?Function
  };

  declare type SubscribeEvent = 'subscribe';
  declare type SubscribeCallback = (channel: string, count: number) => void;

  declare type MessageEvent = 'message';
  declare type MessageCallback = (channel: string, count: number) => void;

  declare type ErrorEvent = 'error';
  declare type ErrorCallback = (error: Error) => void;

  declare type MonitorEvent = 'monitor';
  declare type MonitorCallback = (time: string, args: Array<string>) => void;

  // `drain` & `idle` are deprecated
  declare type OtherEvent = 'ready' | 'connect' | 'reconnecting' | 'end' |
    'drain' | 'warning' | 'idle';

  declare class Client<K, V> {
    on(event: SubscribeEvent, callback: SubscribeCallback): void;
    on(event: MessageEvent, callback: MessageCallback): void;
    on(event: ErrorEvent, callback: ErrorCallback): void;
    on(event: MonitorEvent, callback: MonitorCallback): void;
    on(event: OtherEvent): void;

    set(kv: [K, V], callback?: Function): void;
    set(key: K, value: V, callback?: Function): void;

    get(key: K): V;

    hset(hkv: [string, string, string], callback?: Function): void;
    hset(hKey: string, reply: string, value: string, callback?: Function): void;
    hkeys(hkey: string, callback: (error: Error, replies: Array<string>) => void): void;

    keys(match: string, callback: (error: Error, keys: Array<string>) => void): void;

    incr(key: string, callback: (error: Error, reply: number) => void): void;
    hincrby(key: string, index: string, step: number): void;
    hgetall(key: string, callback: (error: Error, reply: {[key: K]: V}) => void): void;

    monitor(callback: (error: Error, res: string) => void): void;
    info(callback: (error: Error, reply: string) => void): void;

    type(key: string, callback: (error: Error, type: string) => void): void;

    publish(channel: string, message: string): void;
    subscribe(channel: string): void;
    unsubscribe(): void;
    quit(): void;
  }

  declare function createClient<K, V>(port: number, host?: string, option?: Option): Client<K, V>;
  declare function createClient<K, V>(port: number, option?: Option): Client<K, V>;
  declare function createClient<K, V>(unix_socket_or_redis_url: string, option?: Option): Client<K, V>;
  declare function createClient<K, V>(option?: Option): Client<K, V>;
  declare function print(): void;
}
